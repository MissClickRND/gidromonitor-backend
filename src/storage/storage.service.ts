import { Injectable } from "@nestjs/common";
import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";

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
}
