import { NextRequest , NextResponse } from "next/server";
import { connectDB } from "../config/db";
import bcrypt from "bcryptjs";
import { createUsersTable } from "../config/tables/user";


export async function POST(request: NextRequest) {
    try {
        const db = await connectDB();

        await createUsersTable();

        const { username, email, password } = await request.json();

        const hashedPassword = await bcrypt.hash(password, 10);

        const [rows] = await db.execute(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [username, email, hashedPassword]
        );

        return NextResponse.json({
            success: true,
            data: rows,
        });
    } catch (error: any) {
        console.log("SIGNUP ERROR:", error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}