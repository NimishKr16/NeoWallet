"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
    
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-6">NeoWallet Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6 bg-gray-900 text-white shadow-lg">
          <CardHeader>
            <CardTitle>Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$10,000</p>
          </CardContent>
        </Card>

        <Card className="p-6 bg-gray-900 text-white shadow-lg">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Amazon - $120</p>
            <p>Spotify - $10</p>
          </CardContent>
        </Card>

        <Card className="p-6 bg-gray-900 text-white shadow-lg">
          <CardHeader>
            <CardTitle>Send Money</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-blue-500 hover:bg-blue-600">
              Send Now
            </Button>
          </CardContent>
        </Card>
      </div>

      <Button onClick={logout} className="mt-6 bg-red-500 hover:bg-red-600">
        Logout
      </Button>
    </div>
  );
}