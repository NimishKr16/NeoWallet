import { NextResponse } from "next/server";
import Stripe from "stripe";
import admin from "firebase-admin";
import { getFirestore, FieldValue} from "firebase-admin/firestore";
// import { db } from "../../../lib/firebaseConfig";
// import { doc, getDoc, updateDoc, arrayUnion, increment } from "firebase/firestore";

const firebaseAdminConfig = JSON.parse(
    Buffer.from(process.env.FIREBASE_ADMIN_CREDENTIALS ?? "", "base64").toString()
  );
// 🔹 Initialize Firebase Admin SDK (only once)
if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(firebaseAdminConfig),
    });
  }
  
const db = getFirestore(); // Get Firestore instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-02-24.acacia" });

export async function POST(req: Request) {
  try {
    const { amount, userId } = await req.json(); // Get amount & userId

    if (!userId) {
        return NextResponse.json({ error: "User ID is required." }, { status: 400 });
      }

      const userDocRef = db.collection("users").doc(userId); // ✅ Correct (Admin SDK)
      const userDocSnap = await userDocRef.get(); // ✅ Correct for Firebase Admin SDK
  
      if (!userDocSnap.exists) {
        return new Response("User not found", { status: 404 });
      }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "NeoWallet Top-up" },
            unit_amount: amount * 100, // Convert dollars to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `https://neo-wallet-vert.vercel.app/success?session_id={CHECKOUT_SESSION_ID}&user_id=${userId}`,
      cancel_url: `https://neo-wallet-vert.vercel.app/dashboard`,
    });

    // Update balance and transactions in Firestore
    await userDocRef.update({
        balance: FieldValue.increment(amount),
        transactions: FieldValue.arrayUnion({
          amount,
          timestamp: new Date().toISOString(),
        }),
      });
    return NextResponse.json({ url: session.url });
  } 
  catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error("An unknown error occurred", error);
    }
}
}

