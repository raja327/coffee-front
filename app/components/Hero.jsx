import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-[50%_50%] relative mt-14 sm:mt-0">
      {/* Background Beans */}
      <div className="absolute -top-[100px] -left-[100px] z-0">
        <img
          src="beans.svg"
          alt=""
          className="w-[200px] sm:w-[250px] md:w-[318px] opacity-[0.03] rotate-[116deg]"
        />
      </div>

      {/* Left Content */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-16 py-10 md:py-0 flex flex-col items-start justify-center z-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#5A3D2E]">
          From Crop To Cup
        </h1>
        <p className="text-sm sm:text-base md:text-lg leading-relaxed md:leading-8 my-4 text-[#4D3D2E] lg:max-w-[600px]">
          Himalayan Java Coffee Beans are grown locally and are roasted to
          perfection in the ideal Himalayan air. It is then packaged immediately
          and rushed off to our outlets which ensures we deliver the best coffee
          experience possible for all of our customers.
        </p>
        <button className="bg-[#6A3D2A] font-medium text-white px-6 py-2 rounded-md text-sm sm:text-base hover:bg-[#5A3D2E] transition">
          See Menu
        </button>
        <div className="mt-6 flex gap-4 text-xl text-[#6A3D2A]">
          <FaFacebookF className="hover:scale-110 transition" />
          <FaInstagram className="hover:scale-110 transition" />
          <FaYoutube className="hover:scale-110 transition" />
        </div>
      </div>

      {/* Right Image with Overlay */}
      <div className="relative h-[300px] sm:h-[400px] md:h-auto min-h-[300px] sm:min-h-[500px] md:min-h-screen w-full">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('/images/hero.jpg')] bg-cover bg-center"></div>

        {/* Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#4D3D2E]/90 text-white py-3 px-4 text-sm sm:text-base">
          <div className="flex flex-col sm:flex-row justify-between gap-2 text-center sm:text-left">
            <p>
              <span className="font-bold">7</span> Years Experience
            </p>
            <p>
              <span className="font-bold">25+</span> Coffee Consumed
            </p>
            <p>
              <span className="font-bold">25+</span> Customer
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
