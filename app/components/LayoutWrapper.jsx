"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Header from "./Header";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  if (!pathname) return null;

  const hideLayout =
    pathname.startsWith("/admin") ||
    pathname === "/login" ||
    pathname === "/register";

  const showHomeHeader = pathname === "/";
  const showMenuHeader = pathname === "/menu";
  const showMenuDetailsHeader =
    pathname.startsWith("/menu/") && pathname !== "/menu";
  const showServicesHeader = pathname === "/services";
  const showContactHeader = pathname === "/contact";
  const showCartHeader = pathname === "/cart";
  const showOrdersMyHeader = pathname === "/orders/my";
  const showProfileHeader = pathname === "/profile";

  return (
    <>
      {showHomeHeader && <Header />}
      {!hideLayout && <Navbar />}

      {/* Page-specific headers */}
      {showMenuHeader && (
        <div className=" pt-32 pb-16 text-center">
          <h1 className="text-4xl font-bold text-[#5A3D2E]">Our Menu</h1>
        </div>
      )}

      {showServicesHeader && (
        <div className="pt-32 pb-16 text-center">
          <h1 className="text-4xl font-bold text-[#5A3D2E]">Our Services</h1>
        </div>
      )}

      {showContactHeader && (
        <div className="pt-32 pb-16 text-center">
          <h1 className="text-4xl font-bold text-[#5A3D2E]">Contact Us</h1>
        </div>
      )}
      {showCartHeader && (
        <div className="pt-32 pb-16 text-center">
          <h1 className="text-4xl font-bold text-[#5A3D2E]">Your Cart</h1>
        </div>
      )}

      {showOrdersMyHeader && (
        <div className="pt-32 pb-16 text-center">
          <h1 className="text-4xl font-bold text-[#5A3D2E]">Your Orders</h1>
        </div>
      )}

      {showProfileHeader && (
        <div className="pt-32 pb-16 text-center">
          <h1 className="text-4xl font-bold text-[#5A3D2E]">Your Profile</h1>
        </div>
      )}

      {showMenuDetailsHeader && (
        <div className="pt-32 pb-16 text-center">
          <h1 className="text-4xl font-bold text-[#5A3D2E]">Menu Item</h1>
        </div>
      )}

      <main className="flex-grow">{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
}
