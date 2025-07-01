"use client";

import { useGetAllUsersQuery } from "../../services/authApi";
import { Trash2 } from "lucide-react";

export default function UsersPage() {
  const { data: users, isLoading } = useGetAllUsersQuery();

  return (
    <div className="max-w-7xl mx-auto px-8 mt-10 pb-10 overflow-x-auto bg-[#FAF6F0] rounded-2xl shadow-md">
      <h2 className="text-3xl font-bold text-[#5A3D2E] mb-6 text-center">
        ☕ All Users
      </h2>

      {isLoading ? (
        <p className="text-center text-[#5A3D2E]">Loading users...</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[#E6D3C4] bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-[#F7EAD7] text-[#5A3D2E] uppercase text-left">
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Role</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr
                  key={user._id}
                  className="border-t border-[#E6D3C4] hover:bg-[#FAF6F0] transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-[#5A3D2E] font-medium">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#7B5E3C]">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#7B5E3C] capitalize">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-4">
                    <button className="text-sm text-[#5A3D2E] hover:underline">
                      {user.role === "admin" ? "Revoke Admin" : "Make Admin"}
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
