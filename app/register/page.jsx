"use client";

import { useForm } from "react-hook-form";
import { useRegisterUserMutation } from "../services/authApi";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [registerUser, { isLoading, error }] = useRegisterUserMutation();
  const router = useRouter();
  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const res = await registerUser(data);
      // console.log(res);
      if (res.error)
        return alert("Registration failed :" + res.error.data.message);
      if (res.data) {
        alert("Registration successful", res.data.message);
        router.push("/login");
      }
    } catch (err) {
      console.error("Signup failed", err);
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h1 className="text-xl mb-4">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Name"
          className="p-2 border"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="p-2 border"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          className="p-2 border"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
        <input
          type="password"
          placeholder="ConfirmPassword"
          className="p-2 border"
          {...register("confirmpassword", {
            required: "Confirm Password is required",
            validate: (value) =>
              value === password || "Password does not match",
          })}
        />
        {errors.confirmpassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmpassword.message}
          </p>
        )}
        <button
          type="submit"
          className="bg-black text-white p-2"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>

        {error && <p className="text-red-500">Registration failed</p>}
      </form>
    </div>
  );
};

export default RegisterPage;
