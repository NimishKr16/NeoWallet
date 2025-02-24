"use client";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/");
    return null;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Wallet Dashboard</h1>
      <p>Balance: ₹10,000 (Demo)</p>
      <button onClick={logout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Logout</button>
    </div>
  );
}