import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/app/api/config/db";
import bcrypt from "bcryptjs";
import type { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const db = await connectDB();

        const [rows]: any = await db.execute(
          "SELECT * FROM users WHERE email = ?",
          [credentials.email]
        );

        if (!rows.length) {
          throw new Error("User not found");
        }

        const user = rows[0];

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET, // CORRECT
  },

  pages: {
    signIn: "/login",
  },
};

// FIX for TypeScript + App Router compatibility
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
