"use client";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user, login, logout } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">NeoWallet</h1>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}</p>
          <button onClick={logout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Logout</button>
        </div>
      ) : (
        <button onClick={login} className="bg-blue-500 text-white px-4 py-2 rounded">Sign in with Google</button>
      )}
    </div>
  );
}