"use client";

import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} from "../services/authApi";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);

  const { data: profileData, isLoading } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const [changePassword] = useChangePasswordMutation();

  useEffect(() => {
    if (user?.role === "admin") {
      router.push("/admin/dashboard");
    }
  }, [user, router]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    formState: { errors: passwordErrors },
  } = useForm();

  useEffect(() => {
    if (profileData) {
      reset({
        name: profileData?.name,
        email: profileData?.email,
      });
    }
  }, [profileData, reset]);

  const onSubmitProfile = async (data) => {
    try {
      if (
        data.name === profileData?.name &&
        data.email === profileData?.email
      ) {
        alert("No changes detected.");
        return;
      }
      const result = await updateProfile(data);
      dispatch(setCredentials(result?.data));
      alert("Profile updated");
    } catch {
      alert("Failed to update profile");
    }
  };

  const onSubmitPassword = async (data) => {
    try {
      await changePassword(data).unwrap();
      alert("Password changed");
      resetPassword();
    } catch {
      alert("Failed to change password");
    }
  };

  if (isLoading)
    return <p className="text-center text-[#5A3D2E]">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Profile Info Form */}
        <div className="bg-[#FFF8F2] p-6 rounded-2xl shadow-md border border-[#D3B8AE]">
          <h2 className="text-2xl font-semibold text-[#5A3D2E] mb-6">
            Profile Information
          </h2>
          <form onSubmit={handleSubmit(onSubmitProfile)} className="space-y-5">
            <div>
              <label className="block mb-1 text-[#38220F]">Name</label>
              <input
                className="w-full border border-[#D3B8AE] p-3 rounded bg-white"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-[#38220F]">Email</label>
              <input
                className="w-full border border-[#D3B8AE] p-3 rounded bg-white"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button className="bg-[#5A3D2E] hover:bg-[#4b2f23] text-white px-6 py-2 rounded shadow">
              Update Profile
            </button>
          </form>
        </div>

        {/* Password Change Form */}
        <div className="bg-[#FFF8F2] p-6 rounded-2xl shadow-md border border-[#D3B8AE]">
          <h2 className="text-2xl font-semibold text-[#5A3D2E] mb-6">
            Change Password
          </h2>
          <form
            onSubmit={handlePasswordSubmit(onSubmitPassword)}
            className="space-y-5"
          >
            <div>
              <label className="block mb-1 text-[#38220F]">
                Current Password
              </label>
              <input
                type="password"
                className="w-full border border-[#D3B8AE] p-3 rounded bg-white"
                {...registerPassword("currentPassword", {
                  required: "Current password is required",
                })}
              />
              {passwordErrors.currentPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {passwordErrors.currentPassword.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-[#38220F]">New Password</label>
              <input
                type="password"
                className="w-full border border-[#D3B8AE] p-3 rounded bg-white"
                {...registerPassword("newPassword", {
                  required: "New password is required",
                })}
              />
              {passwordErrors.newPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {passwordErrors.newPassword.message}
                </p>
              )}
            </div>

            <button className="bg-[#6C4A3C] hover:bg-[#50372A] text-white px-6 py-2 rounded shadow">
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
