"use client";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";

const AdminLayout = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  console.log(user);

  useEffect(() => {
    // Redirect if not logged in or not an admin
    if (!user || user.role !== "admin") {
      router.push("/login");
    }
  }, [user, router]);

  // if (!user || user.role !== "admin") {
  //   return null; // Optional: return loader or nothing while checking
  // }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
};

export default AdminLayout;
