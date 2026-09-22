import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class AirflowService {
    private readonly airflowUrl = process.env.AIRFLOW_URL!;
    private readonly username = process.env._AIRFLOW_WWW_USER_USERNAME!;
    private readonly password = process.env._AIRFLOW_WWW_USER_PASSWORD!;

    async startGeospatialExport(
        id: string,
        geometry: {
            type: "Polygon";
            coordinates: number[][][];
        },
        dateBefore: string,
        dateAfter: string,
    ): Promise<void> {
        const polygon = {
            type: "Feature",
            geometry,
            properties: {},
        };

        await axios.post(
            `${this.airflowUrl}/api/v2/dags/gee_geospatial_data_export/dagRuns`,
            {
                conf: {
                    id,
                    polygon,
                    date_pre: dateBefore,
                    date_peak: dateAfter,
                },
            },
            {
                auth: {
                    username: this.username,
                    password: this.password,
                },
            },
        );
    }
}