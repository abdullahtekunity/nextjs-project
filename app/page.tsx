import Image from "next/image";
import ProtectedRoute from "./components/protectedroute";

export default function Home() {
  return (
    <ProtectedRoute>
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
       <h1 className="text-4xl">HELLO </h1>
    </div>
    </ProtectedRoute>
  );
}
