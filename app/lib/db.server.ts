import mariadb from "mariadb";
import "dotenv/config";

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT ?? 3306),

  connectionLimit: 20,
  acquireTimeout: 10000,
  connectTimeout: 10000,

  charset: "utf8mb4",
});

export async function query<T = unknown>(
  sql: string,
  params: unknown[] = []
): Promise<T[]> {
  let conn;

  try {
    conn = await pool.getConnection();

    if (process.env.NODE_ENV === "development") {
      console.log("[DB]", sql, params);
    }

    const result = await conn.query(sql, params);

    return Array.isArray(result)
      ? (result as T[])
      : [result as T];

  } catch (error) {
    console.error("[DB ERROR]", error);
    throw error;
  } finally {
    if (conn) conn.release();
  }
}
