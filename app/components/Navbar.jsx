"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { logout } from "../redux/slices/authSlice";
import {
  ShoppingCart,
  ChevronDownIcon,
  ChevronRight,
  LogInIcon,
  MenuIcon,
  XIcon,
  ShoppingBag,
} from "lucide-react";
import { useRef, useEffect, useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false); // NEW
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const { user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalQty = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // NEW: Scroll listener for color change
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  if (!isMounted) return null;

  const isHome = pathname === "/";

  // ------------------------
  // === HOME PAGE NAVBAR ===
  // ------------------------
  if (isHome) {
    return (
      <nav
        className={`fixed top-0 left-0  right-0 w-full z-50 px-6 py-1 flex justify-center transition-colors duration-300 ${
          scrolled
            ? "bg-[#6A3D2A] shadow-md" // Background color & shadow on scroll
            : "bg-transparent" // Transparent at top
        }`}
      >
        <div
          className={`hidden sm:flex gap-10 items-center text-sm md:text-base px-6 py-2 rounded-lg ${
            scrolled ? "text-white" : "text-[#6A3D2A]"
          }`}
        >
          <Link href="/" className={`hover:text-yellow-300 transition`}>
            Home
          </Link>
          <Link href="/menu" className="hover:text-yellow-300 transition">
            Menu
          </Link>

          {/* Center Logo */}
          <Link
            href="/"
            className={`text-2xl font-bold tracking-wide flex flex-col items-center ${
              scrolled ? "text-white" : "text-[#6A3D2A]"
            }`}
          >
            <img src="logo.svg" alt="Logo" className="w-[60px] h-[60px]" />
            <p
              className={`hover:text-yellow-300 transition font-satisfy font-normal text-[16px] ${
                scrolled ? "text-white" : "text-[#6A3D2A]"
              }`}
            >
              CoffeeHouse
            </p>
          </Link>

          <Link
            href="/contact"
            className={`hover:text-yellow-300 transition font-normal text-[16px] ${
              scrolled ? "text-white" : "text-white"
            } `}
          >
            Contact
          </Link>

          <Link
            href="/cart"
            className={`relative hover:text-yellow-300 transition font-normal text-[16px] ${
              scrolled ? "text-white" : "text-white"
            } `}
            aria-label={`Cart with ${totalQty} items`}
          >
            <span className="flex items-center gap-1">
              Cart <ShoppingCart size={20} />
              {totalQty > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-1 rounded-full">
                  {totalQty}
                </span>
              )}
            </span>
          </Link>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserDropdownOpen((prev) => !prev)}
                className={`flex items-center gap-1 hover:text-yellow-300 transition font-normal text-[16px] ${
                  scrolled ? "text-white" : "text-white"
                } `}
                aria-haspopup="true"
                aria-expanded={userDropdownOpen}
                aria-label="User menu"
              >
                {user.name?.slice(0, 4).toUpperCase()}
                {userDropdownOpen ? (
                  <ChevronDownIcon size={20} />
                ) : (
                  <ChevronRight size={20} />
                )}
              </button>
              {userDropdownOpen && (
                <div
                  className="absolute top-10 right-0 bg-white text-[#5A3D2E] w-40 rounded shadow-lg z-50 py-2"
                  role="menu"
                  aria-label="User menu options"
                >
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-[#f6f1ed]"
                    role="menuitem"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/orders/my"
                    className="block px-4 py-2 hover:bg-[#f6f1ed]"
                    role="menuitem"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-[#f6f1ed]"
                    role="menuitem"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className={`relative hover:text-yellow-300 transition ${
                scrolled ? "text-white" : "text-white"
              }`}
            >
              <span className="flex items-center gap-1">
                Login <LogInIcon size={20} />
              </span>
            </Link>
          )}
        </div>

        {/* Mobile Navbar */}
        <div
          className={`sm:hidden w-full shadow-none px-6 py-2 rounded-lg transition-colors duration-300 ${
            scrolled
              ? "bg-[#6A3D2A] text-white"
              : "bg-transparent text-[#6A3D2A]"
          }`}
        >
          <div className="flex items-center justify-between w-full">
            <Link
              href="/"
              className="text-2xl flex items-center font-bold tracking-wide"
            >
              <img src="logo.svg" alt="Logo" className="w-[60px] h-[60px]" />
              <p className="hover:text-yellow-300 transition font-satisfy font-bold text-[16px]">
                CoffeeHouse
              </p>
            </Link>
            {!mobileMenuOpen ? (
              <MenuIcon
                className="cursor-pointer"
                size={30}
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    setMobileMenuOpen(true);
                }}
              />
            ) : (
              <XIcon
                className="cursor-pointer"
                size={30}
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    setMobileMenuOpen(false);
                }}
              />
            )}
          </div>
          {mobileMenuOpen && (
            <div className="flex flex-col gap-2 mt-2">
              <Link
                href="/"
                className="hover:text-yellow-300 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/menu"
                className="hover:text-yellow-300 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Menu
              </Link>
              <Link
                href="/contact"
                className="hover:text-yellow-300 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/cart"
                className="relative hover:text-yellow-300 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cart
                {totalQty > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-1 rounded-full">
                    {totalQty}
                  </span>
                )}
              </Link>
              {user ? (
                <>
                  <Link
                    href="/profile"
                    className="hover:text-yellow-300 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/orders/my"
                    className="hover:text-yellow-300 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  <button
                    className="hover:text-yellow-300 transition text-left"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="hover:text-yellow-300 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          )}
        </div>
      </nav>
    );
  }

  // -----------------------------------
  // === NON-HOME PAGE NAVBAR DESIGN ===
  // -----------------------------------

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-[#6A3D2A] px-6 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center text-white">
        <Link href="/" className="flex items-center gap-2">
          <img src="logo.svg" alt="Logo" className="w-10 h-10" />
          <span className="font-semibold text-lg tracking-wide">
            CoffeeHouse
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
          <Link href="/" className="hover:text-yellow-300 transition">
            Home
          </Link>
          <Link href="/menu" className="hover:text-yellow-300 transition">
            Menu
          </Link>
          <Link href="/contact" className="hover:text-yellow-300 transition">
            Contact
          </Link>
          <Link
            href="/cart"
            className="relative hover:text-yellow-300 transition"
            aria-label={`Cart with ${totalQty} items`}
          >
            Cart
            {totalQty > 0 && (
              <span className="absolute -top-2 -right-3 bg-yellow-500 text-[#6A3D2A] text-xs px-1 rounded-full">
                {totalQty}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserDropdownOpen((prev) => !prev)}
                className="flex items-center gap-1 hover:text-yellow-300 transition"
                aria-haspopup="true"
                aria-expanded={userDropdownOpen}
                aria-label="User menu"
              >
                {user.name?.slice(0, 4).toUpperCase()}
                {userDropdownOpen ? (
                  <ChevronDownIcon size={20} />
                ) : (
                  <ChevronRight size={20} />
                )}
              </button>
              {userDropdownOpen && (
                <div
                  className="absolute top-10 right-0 bg-white text-[#6A3D2A] w-44 rounded shadow-lg z-50 py-2"
                  role="menu"
                  aria-label="User menu options"
                >
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-[#f6f1ed]"
                    role="menuitem"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/orders/my"
                    className="block px-4 py-2 hover:bg-[#f6f1ed]"
                    role="menuitem"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setUserDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-[#f6f1ed]"
                    role="menuitem"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1 hover:text-yellow-300 transition"
            >
              Login <LogInIcon size={20} />
            </Link>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center">
          {!mobileMenuOpen ? (
            <MenuIcon
              className="cursor-pointer text-white"
              size={30}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setMobileMenuOpen(true);
              }}
            />
          ) : (
            <XIcon
              className="cursor-pointer text-white"
              size={30}
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  setMobileMenuOpen(false);
              }}
            />
          )}
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#6A3D2A] text-white flex flex-col gap-2 py-4 px-6 md:hidden z-50">
            <Link
              href="/"
              className="hover:text-yellow-300 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/menu"
              className="hover:text-yellow-300 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Menu
            </Link>
            <Link
              href="/contact"
              className="hover:text-yellow-300 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/cart"
              className="relative hover:text-yellow-300 transition"
              onClick={() => setMobileMenuOpen(false)}
              aria-label={`Cart with ${totalQty} items`}
            >
              Cart
              {totalQty > 0 && (
                <span className="absolute -top-2 -right-3 bg-yellow-500 text-[#6A3D2A] text-xs px-1 rounded-full">
                  {totalQty}
                </span>
              )}
            </Link>
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-1 hover:text-yellow-300 transition"
                  aria-haspopup="true"
                  aria-expanded={userDropdownOpen}
                  aria-label="User menu"
                >
                  {user.name?.slice(0, 4).toUpperCase()}
                  {userDropdownOpen ? (
                    <ChevronDownIcon size={20} />
                  ) : (
                    <ChevronRight size={20} />
                  )}
                </button>
                {userDropdownOpen && (
                  <div
                    className="bg-yellow-300 text-[#6A3D2A] w-full rounded shadow-lg z-50 py-2 mt-2"
                    role="menu"
                    aria-label="User menu options"
                  >
                    <Link
                      href="/profile"
                      className="block px-4 py-2 hover:bg-[#f6f1ed]"
                      role="menuitem"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/orders/my"
                      className="block px-4 py-2 hover:bg-[#f6f1ed]"
                      role="menuitem"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-[#f6f1ed]"
                      role="menuitem"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1 hover:text-yellow-300 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login <LogInIcon size={20} />
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );

  return null;
};

export default Navbar;
