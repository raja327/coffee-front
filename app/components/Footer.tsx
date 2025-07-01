"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="px-4 sm:px-10 md:px-16 lg:px-24 ">
      {/* First Part */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 text-center lg:text-left pt-20 pb-10">
        {/* Links */}
        <div className="flex flex-col gap-4">
          <Link href="/">Home</Link>
          <Link href="/">About</Link>
          <Link href="/">Services</Link>
          <Link href="/">Team</Link>
          <Link href="/">FAQs</Link>
          <Link href="/">Careers</Link>
          <Link href="/">Contact Us</Link>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-lg">Contact</h3>
          <div className="font-poppins flex flex-col gap-2 text-sm">
            <span>Tridevi Marg, Thamel</span>
            <span>Kathmandu, Nepal</span>
            <span>info@himalayanjava.com</span>
            <span>+977-01-4435171</span>
          </div>
        </div>

        {/* Google Map */}
        <div className="w-full">
          <iframe
            className="w-full min-h-[200px] rounded-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.105614311399!2d85.31391999999997!3d27.714025200000016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190286e454ad%3A0xb002146d30bac2e5!2sHimalayan%20Java%20-%20Tridevi%20Thamel!5e0!3m2!1sen!2snp!4v1738209778971!5m2!1sen!2snp"
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Second Part */}
      <div className="grid grid-cols-1 sm:grid-cols-3 text-center gap-4 py-10 border-t border-gray-200">
        <div className="text-sm">
          © {new Date().getFullYear()} HimalayanJava
        </div>

        <div className="flex justify-center gap-4 text-xl text-[#6A3D2A]">
          <FaFacebookF color="#3B5998" className="hover:scale-110 transition" />
          <FaYoutube color="#FF0000" className="hover:scale-110 transition" />
          <FaInstagram className="hover:scale-110 transition" />
        </div>

        <div className="text-sm">Created by Rajaram Neupane</div>
      </div>
    </div>
  );
};

export default Footer;
