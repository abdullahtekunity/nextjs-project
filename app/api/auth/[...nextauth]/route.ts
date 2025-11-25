import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/app/api/config/db";
import bcrypt from "bcryptjs";

export const authOptions = {
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
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "supersecretkey",
  },
  pages: {
    signIn: "/login", // optional: custom login page
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
