import "dotenv/config";
import { DataSource } from "typeorm";
import { join } from "node:path";

export const AppDataSource = new DataSource({
    type: "postgres",

    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),

    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE ?? process.env.DB_NAME,

    entities: [join(__dirname, "../**/entities/*.entity{.ts,.js}")],
    migrations: [join(__dirname, "migrations/*{.ts,.js}")],
});
