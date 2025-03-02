"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProtectedRoute from "@/components/ProtectedRoute";
import { TextField } from "@mui/material";
import { db } from "../../lib/firebaseConfig"; // Firebase Client Instance
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Loader2 } from "lucide-react"; // Import spinner icon

export default function DashboardPage() {
  const { user } = useAuth();
  const [amount, setAmount] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<
    { type: string; amount: number }[]
  >([]);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchUserData = async () => {
      setLoadingData(true); 
      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          // If user doesn't exist, create a new entry
          await setDoc(userRef, { balance: 0, transactions: [] });
        } else {
          const userData = userSnap.data();
          setBalance(userData.balance || 0);
          setTransactions(userData.transactions || []);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      finally {
        setLoadingData(false); // Stop loading after fetching
      }
    };

    fetchUserData();
  }, [user, router]);

  // Handle Add Money
  const handleAddMoney = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/stripe-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Number(amount), userId: user?.uid }), // Pass userId
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center p-10">
        <h1 className="text-3xl font-bold mb-6">NeoWallet Dashboard</h1>
        {loadingData ? (
          <div className="flex flex-col items-center justify-center h-48">
            <Loader2 className="w-12 h-12 text-gray-400 animate-spin" />
            <p className="text-gray-400 mt-2">Loading data...</p>
          </div>
        ) : (
    <>
    
        <Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-xl rounded-xl w-full md:w-80">
  <CardHeader className="flex flex-col items-center">
    <CardTitle className="text-lg font-semibold text-gray-300 uppercase tracking-wide">
      Wallet Balance
    </CardTitle>
  </CardHeader>
  <CardContent className="flex flex-col items-center">
    <p className="text-4xl font-bold text-green-400 drop-shadow-lg">
      ${balance.toFixed(2)}
    </p>
    <p className="text-sm text-gray-400 mt-2 pt-4">(Updated in real-time)</p>
  </CardContent>
</Card>

       {/* Transactions Section */}
<div className="mt-6 w-full max-w-lg bg-gray-900 p-6 rounded-xl shadow-lg">
  <h2 className="text-lg font-semibold text-gray-300 border-b border-gray-700 pb-2 mb-4">
    Recent Transactions
  </h2>

  {transactions.length > 0 ? (
    <ul className="space-y-4">
      {transactions.map((tx, index) => (
        <li
          key={index}
          className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-sm"
        >
          <span className="text-gray-300">
            {tx.type || "Deposit"}
          </span>
          <span
            className={`font-semibold ${
              tx.amount >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            ${tx.amount ?? 0}
          </span>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-400 text-center">No transactions yet.</p>
  )}
</div>

        <div className="mt-6 mb-2">
          <TextField
            variant="filled"
            type="number"
            label="Enter amount (USD)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-white rounded-md p-2 mb-4"
          />
        </div>

        <Button
          onClick={handleAddMoney}
          disabled={loading}
          className="mt-4 bg-green-500 hover:bg-green-600"
        >
          {loading ? "Processing..." : `Add $${amount || "Money"}`}
        </Button>
        </>
        )}
      </div>
    </ProtectedRoute>
  );
}
