"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { db } from "../../lib/firebaseConfig"; // Firebase Client Instance
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const userId = searchParams.get("userId");

  useEffect(() => {
    const updateFirestore = async () => {
      if (!userId || !sessionId) return;

      try {
        const userRef = doc(db, "users", userId);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
          console.error("User not found in Firestore!");
          return;
        }

        const userData = userDoc.data();
        const newBalance = (userData.balance || 0) + 50; // Change this to dynamic amount

        // Update balance & add transaction
        await updateDoc(userRef, {
          balance: newBalance,
          transactions: arrayUnion({
            id: sessionId,
            amount: 50, // Change this to dynamic amount
            type: "Top-up",
            date: new Date().toISOString(),
          }),
        });

        console.log("Transaction added successfully!");
      } catch (error) {
        console.error("Error updating Firestore:", error);
      }
    };

    updateFirestore();
  }, [sessionId, userId]);

  return (
    <Suspense fallback={<p>Loading...</p>}>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg text-center">
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto animate-bounce" />
        <h1 className="text-3xl font-bold mt-4">Payment Successful!</h1>
        <p className="text-gray-400 mt-2">Your wallet has been credited successfully.</p>

        <Button onClick={() => router.push("/dashboard")} className="mt-6 bg-blue-500 hover:bg-blue-600 px-6 py-2 text-lg">
          Back to Dashboard
        </Button>
      </div>
    </div>
    </Suspense>
  );
}