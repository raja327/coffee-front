"use client";

import { useForm } from "react-hook-form";
import { useLoginUserMutation } from "../services/authApi";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";
import Image from "next/image";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data);
      if (res.error) {
        alert(res.error.data?.message || "Login failed");
        return;
      }
      if (res.data) {
        dispatch(setCredentials(res.data));
        router.push(res.data.role === "admin" ? "/admin" : "/");
      }
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#F3F2EF] via-[#E0DFDC] to-[#CBCAC7]
 flex items-center justify-center"
    >
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border-2 border-[#5A3D2E]">
        <div className="flex justify-center mb-6">
          <Image src="logo.svg" alt="Coffee Logo" width={60} height={60} />
        </div>

        <h1 className="text-3xl font-bold text-center mb-6 text-[#5A3D2E]">
          Welcome Back!
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5A3D2E] text-[#5A3D2E]"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5A3D2E] text-[#5A3D2E]"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`group relative inline-flex items-center justify-center w-full py-3 px-6
            rounded-md bg-[#5A3D2E] text-white
            hover:bg-[#4a3324]
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-300 ease-in-out shadow-md`}
            disabled={isLoading}
          >
            <span className="relative z-10 font-semibold tracking-wide">
              {isLoading ? "Logging in..." : "Login"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
