import { connectDB } from "../db";

export async function createProductsTable() {
  const db = await connectDB();

  await db.execute(`
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(200),
      price DECIMAL(10,2),
      description TEXT,
      image VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log("Products table ready!");
}
