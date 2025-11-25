import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/app/api/config/db";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const db = await connectDB();
        const [rows] = await db.execute(
          "SELECT * FROM users WHERE email = ?",
          [credentials?.email]
        );

        if (!rows.length) throw new Error("User not found");

        const user = rows[0];
        const isValid = await bcrypt.compare(credentials!.password, user.password);

        if (!isValid) throw new Error("Invalid password");

        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  session: {
    strategy: "jwt", // TypeScript now recognizes this as valid
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET, // use NEXTAUTH_SECRET, not JWT_SECRET
  },
  pages: {
    signIn: "/login",
  },
};
