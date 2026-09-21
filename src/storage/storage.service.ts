import { Injectable, NotFoundException } from "@nestjs/common";
import {
    GetObjectCommand,
    ListObjectsV2Command,
    S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

@Injectable()
export class StorageService {
    private readonly s3: S3Client;

    constructor() {
        this.s3 = new S3Client({
            endpoint: process.env.S3_ENDPOINT,
            region: process.env.S3_REGION,
            credentials: {
                accessKeyId: process.env.YANDEX_ACCESS_KEY!,
                secretAccessKey: process.env.YANDEX_SECRET_KEY!,
            },
            forcePathStyle: true,
        });
    }

    async listFiles() {
        const command = new ListObjectsV2Command({
            Bucket: process.env.YC_BUCKET,
        });

        const result = await this.s3.send(command);

        return result.Contents?.map((file) => ({
            key: file.Key,
            size: file.Size,
            lastModified: file.LastModified,
        }));
    }

    async getAnalysisFiles(analysisId: string) {
        const prefix = `gee_exports/${analysisId}/`;

        const command = new ListObjectsV2Command({
            Bucket: process.env.YC_BUCKET,
            Prefix: prefix,
        });

        const result = await this.s3.send(command);

        const files = result.Contents ?? [];

        if (files.length === 0) {
            throw new NotFoundException(
                `Файлы для анализа ${analysisId} не найдены`,
            );
        }

        const resultFiles = await Promise.all(
            files
                .filter(
                    (file) =>
                        file.Key && !file.Key.endsWith("/") && file.Size !== 0,
                )
                .map(async (file) => {
                    const key = file.Key!;

                    const command = new GetObjectCommand({
                        Bucket: process.env.YC_BUCKET,
                        Key: key,
                    });

                    const url = await getSignedUrl(this.s3, command, {
                        expiresIn: 60 * 15,
                    });

                    return {
                        fileName: key.split("/").pop(),
                        size: file.Size,
                        url,
                    };
                }),
        );

        return resultFiles;
    }
}
