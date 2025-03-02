"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react"; // Import spinner icon

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth?.user) {
      router.push("/login"); // Redirect if not authenticated
    } else {
      setLoading(false); // Stop loading once authenticated
    }
  }, [auth?.user, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 text-gray-500 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;