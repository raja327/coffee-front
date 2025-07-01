import { useRouter } from "next/router";
import React, { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);
  return children;
};

export default ProtectedRoute;
