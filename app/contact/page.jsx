"use client";

import { useForm } from "react-hook-form";

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(`Thank you for contacting us, ${data.name}!`);
        reset();
        resolve();
      }, 1500);
    });
  };

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat min-h-screen px-4 py-20"
      style={{
        backgroundImage: "url('/coffee-bg-cup.avif')",
      }}
    >
      {/* Warm soft overlay */}
      <div className="absolute inset-0 bg-[#5A3D2E]/50 backdrop-blur-sm"></div>

      <div className="relative max-w-7xl mx-auto z-10 grid md:grid-cols-2 gap-12 text-[#3B2619]">
        {/* Contact Info */}
        <div className="bg-white backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-white/30 space-y-6">
          <h2 className="text-2xl font-bold">Feel free to contact us</h2>
          <p className="text-lg leading-relaxed">
            We'd love to hear from you! Whether it's a question, suggestion, or
            just to say hi — we’re here.
          </p>

          <div className="space-y-4 text-base">
            <div>
              <h3 className="font-semibold text-lg">📍 Address</h3>
              <p>123 Coffee Avenue, Bean Town, NY 10001</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">📞 Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">✉️ Email</h3>
              <p>contact@coffeehouse.com</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">🕒 Opening Hours</h3>
              <p>Mon - Fri: 7 AM - 8 PM</p>
              <p>Sat - Sun: 8 AM - 10 PM</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="bg-white backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-white/30 space-y-6"
        >
          <h2 className="text-3xl font-semibold text-[#3B2619] mb-4">
            Send a Message
          </h2>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block font-medium mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Name is required" })}
              className={`w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5A3D2E] ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-600 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Invalid email address",
                },
              })}
              className={`w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5A3D2E] ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block font-medium mb-1">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              rows={5}
              {...register("message", { required: "Message is required" })}
              className={`w-full rounded-md border px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#5A3D2E] ${
                errors.message ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.message && (
              <p className="text-red-600 mt-1">{errors.message.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#5A3D2E] text-white py-3 rounded-xl font-semibold hover:bg-[#3B2619] transition"
          >
            {isSubmitting
              ? "Sending..."
              : isSubmitSuccessful
              ? "Sent!"
              : "Send Message"}
          </button>
        </form>
      </div>

      {/* Map */}
      <div className="relative max-w-7xl mx-auto mt-20 rounded-3xl overflow-hidden shadow-2xl border border-white/30 h-[450px]">
        <iframe
          title="Himalayan Java Location"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14128.422483153267!2d85.31392!3d27.714025!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190286e454ad%3A0xb002146d30bac2e5!2sHimalayan%20Java%20-%20Tridevi%20Thamel!5e0!3m2!1sen!2snp!4v1749700767398!5m2!1sen!2snp"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
}
