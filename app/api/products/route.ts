import { connectDB } from "../config/db";
import { NextResponse } from "next/server";
import { createProductsTable } from "../config/tables/products";
import { requireAuth } from "../../middleware/route";


export async function GET() {
   const session = await requireAuth();
  try {
    const db = await connectDB();

    // Fetch all products
    const [rows] = await db.execute("SELECT * FROM products");

    return NextResponse.json(rows);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 } 
    );
  }
}


export async function POST(request: Request) {
  const session = await requireAuth();
  try {
    const db = await connectDB();

    await createProductsTable();

    const { title, price, description, image } = await request.json();

    const [rows] = await db.execute(
      "INSERT INTO products (title, price, description, image) VALUES (?, ?, ?, ?)",
      [title, price, description, image]
    );

    return NextResponse.json({
      success: true,
      data: rows,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}



export async function PUT(request: Request) {
  try {
    const db = await connectDB();

    const { id, title, price, description, image } = await request.json();

    const [rows] = await db.execute(
      "UPDATE products SET title = ?, price = ?, description = ?, image = ? WHERE id = ?",
      [title, price, description, image, id]
    );

    return NextResponse.json(rows);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}