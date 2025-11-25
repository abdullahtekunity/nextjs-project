import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import { NextResponse } from "next/server";

export async function requireAuth() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // You can throw or return a response
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  return session;
}
