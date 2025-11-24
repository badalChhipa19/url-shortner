/**
 * Internal Dependencies
 */
import pool from "./db.js";

export default async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS links (
        code VARCHAR (255) PRIMARY KEY,
        url TEXT NOT NULL,
        hits INTEGER DEFAULT 0,
        last_clicked TIMESTAMP
    );
    `);
};
