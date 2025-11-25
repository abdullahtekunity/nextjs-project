"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const route = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      route.push("/login"); // Redirects to NextAuth login page
    }
  }, [status]);

  if (status === "loading") {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!session) {
    return null; // Waiting for redirect    
  }

  return <>{children}</>;
}
