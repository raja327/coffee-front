"use client";
import { useSelector } from "react-redux";
import Sidebar from "../components/admin/Sidebar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }) {
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    if (!user || user.role !== "admin") {
      router.replace("/");
    }
  }, [user, router]);

  // Delay rendering until after mount to avoid hydration mismatch
  if (!isMounted) return null;

  if (!user || user.role !== "admin") return null;

  return (
    <>
      <Sidebar />
      <main className="min-h-screen bg-gray-100 p-6 pl-60">{children}</main>
    </>
  );
}
