import mysql from "mysql2/promise";
import { loadSpecialities } from "./loadSpecialities.mjs";

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'rootpass',
    database: 'analytics',
};

async function run() {
    const conn = await mysql.createConnection(dbConfig);

    await loadSpecialities(conn, "./dbload/data/provided.xlsx");

    await conn.end();
}

run().catch(console.error);
