"use client";

import Navbar from "./Navbar";

import Hero from "./Hero";

export default function Header() {
  return (
    <header className="">
      <Navbar />
      <Hero />
      {/* <div className="bg-[url('/images/hero.jpg')] bg-cover bg-center h-screen"></div> */}
    </header>
  );
}
