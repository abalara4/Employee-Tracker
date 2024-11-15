import { Pool } from 'pg'; // Importing Pool from pg
import { config } from 'dotenv'; // Import dotenv's config function

config(); // Calling dotenv's config function first

export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
});

