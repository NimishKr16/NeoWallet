"use client";
import { useAuth } from "../../context/AuthContext";
// import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaMicrosoft } from "react-icons/fa";

export default function SignupPage() {
  const { loginWithGoogle } = useAuth()!;
  // const router = useRouter();

  return (
    <div className="flex items-center justify-center h-screen px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Why Trusted Sign-In?</CardTitle>
          <CardDescription>
            NeoWallet prioritizes security and ease of access by using trusted authentication platforms.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-left space-y-4 text-gray-700 text-sm">
            <p><strong>🔒 More Secure:</strong> No passwords to steal, forget, or reset. Your account is protected with advanced security features like multi-factor authentication (MFA).</p>
            <p><strong>⚡ Faster & Seamless:</strong> One-click sign-in with Google, Apple, or Microsoft—no need to remember another password.</p>
            <p><strong>🛡️ Privacy-Focused:</strong> We never store passwords. Your authentication is handled by trusted providers with industry-leading security.</p>
          </div>

          <div className="space-y-3">
            <Button variant="outline" className="w-full flex items-center justify-center space-x-2" onClick={loginWithGoogle}>
              <FcGoogle size={20} /> <span>Continue with Google</span>
            </Button>
            <Button variant="outline" className="w-full flex items-center justify-center space-x-2">
              <FaApple size={20} /> <span>Continue with Apple</span>
            </Button>
            <Button variant="outline" className="w-full flex items-center justify-center space-x-2">
              <FaMicrosoft size={20} /> <span>Continue with Microsoft</span>
            </Button>
          </div>

          <div className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Log in here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}