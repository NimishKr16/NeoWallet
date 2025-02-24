"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <Link href="/" className="text-lg font-bold">NeoWallet</Link>
      {user ? (
        <div>
          <Link href="/dashboard" className="mr-4">Dashboard</Link>
          <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
        </div>
      ) : (
        <Link href="/" className="bg-blue-500 px-3 py-1 rounded">Login</Link>
      )}
    </nav>
  );
}