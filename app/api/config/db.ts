import mysql from "mysql2/promise";

let connection: any;

export async function connectDB() {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });

    console.log("MySQL Connected!");
  }

  return connection;
}
