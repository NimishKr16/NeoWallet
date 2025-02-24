"use client";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth?.user) {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, [auth?.user, router]);

  if (!auth?.user) {
    return <p>Loading...</p>; // Show loading state until redirected
  }

  return <>{children}</>;
};

export default ProtectedRoute;