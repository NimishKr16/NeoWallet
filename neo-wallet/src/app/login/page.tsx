"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaMicrosoft } from "react-icons/fa";
export default function LoginPage() {
  const auth = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // ✅ Track auth state
  
  useEffect(() => {
    if (!auth) return;
    setLoading(false); // ✅ Auth context is loaded
    if (auth.user) {
      router.push("/dashboard");
    }
  }, [auth?.user, router]);

  const handleLogin = async () => {
    try {
      await auth.loginWithEmail(email, password);
      // ✅ Wait for Firebase auth state to update
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err) {
      setError("Failed to login. Please check your credentials.");
    }
  };

  if (loading) return <p>Loading...</p>; // ✅ Prevent flickering

  return (
    <div className="flex items-center justify-center min-h-screen">
    <div className="max-w-md w-full space-y-6 p-6 bg-white shadow-md rounded-lg">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Welcome to NeoWallet</h1>
        <p className="text-gray-800">Sign in to continue</p>
      </div>
      
      <Button variant="outline" className="w-full flex items-center justify-center gap-2"
        onClick={auth.loginWithGoogle}
      >
        <FcGoogle className="h-5 w-5" />
        Sign in with Google
      </Button>

      <Button variant="outline" className="w-full flex items-center justify-center gap-2"
        // onClick={auth.loginWithApple} // Replace with actual function
      >
        <FaApple className="h-5 w-5 text-black" />
        Sign in with Apple
      </Button>

      <Button variant="outline" className="w-full flex items-center justify-center gap-2"
        // onClick={auth.loginWithMicrosoft} // Replace with actual function
      >
        <FaMicrosoft className="h-5 w-5 text-blue-600" />
        Sign in with Microsoft
      </Button>

      <div className="flex justify-between text-sm text-gray-600">
        <Link href="/signup" className="underline">Need Help Signing-In?</Link>
      </div>
    </div>
  </div>
  );
}