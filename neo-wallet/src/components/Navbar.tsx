"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="p-4 bg-gray-900 text-white flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">NeoWallet</Link>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-gray-300">{user.displayName || "User"}</span>
            <Button variant="destructive" onClick={logout}>Logout</Button>
          </>
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}