"use client";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold">Welcome to NeoWallet</h1>
      </div>
    </ProtectedRoute>
  );
}