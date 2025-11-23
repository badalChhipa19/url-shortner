/**
 * External Dependencies
 */
import pg from "pg";

const { DB_STRING } = process.env;

// Initialize the Postgres Client.
const { Pool } = pg;
const pool = new Pool({
  connectionString: DB_STRING,
  ssl: { rejectUnauthorized: false },
});

export default pool;
