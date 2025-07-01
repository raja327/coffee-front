"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useGetBranchesQuery,
  useUpdateBranchMutation,
  useCreateBranchMutation,
  useDeleteBranchMutation,
} from "../../services/branchApi";
import { LucideEdit, Trash2 } from "lucide-react";
import Pagination from "../../components/Pagination";

const AdminBranches = () => {
  const [showBranchForm, setShowBranchForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 5;

  const {
    data,
    isLoading: loadingBranches,
    isError: errorLoadingBranches,
    refetch,
  } = useGetBranchesQuery({ page, limit });

  const [updateBranch] = useUpdateBranchMutation();
  const [createBranch] = useCreateBranchMutation();
  const [deleteBranch] = useDeleteBranchMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleEditClick = (branch) => {
    setShowBranchForm(true);
    setEditingItem(branch);
    reset(branch);
  };

  const handleDeleteClick = async (id) => {
    try {
      if (confirm("Are you sure you want to delete this branch?")) {
        await deleteBranch(id);
        refetch();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitBranch = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("address", data.address);
      formData.append("phone", data.phone);
      formData.append("openHours", data.openHours || "");
      if (data.image?.[0]) formData.append("image", data.image[0]);

      if (editingItem) {
        await updateBranch({ id: editingItem._id, body: formData }).unwrap();
        setEditingItem(null);
      } else {
        await createBranch(formData).unwrap();
      }

      setShowBranchForm(false);
      reset();
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const branches = data?.branches || [];
  const totalPages = data?.pagination?.pages || 1;

  return (
    <div className="max-w-6xl mx-auto px-4 my-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#5A3D2E]">Branch Management</h2>
        <button
          onClick={() => {
            setShowBranchForm(!showBranchForm);
            setEditingItem(null);
            reset();
          }}
          className="px-4 py-2 bg-[#5A3D2E] text-white rounded hover:bg-[#8B5E3C] transition-colors duration-300"
        >
          {showBranchForm ? "Back to List" : "Create Branch"}
        </button>
      </div>

      {showBranchForm ? (
        <form
          onSubmit={handleSubmit(handleSubmitBranch)}
          className="space-y-6 bg-[#FAF6F0] p-8 rounded-2xl shadow-lg max-w-xl mx-auto border border-[#E6D3C4]"
          encType="multipart/form-data"
        >
          <h2 className="text-2xl font-semibold text-[#5A3D2E] text-center">
            {editingItem ? "Update Branch" : "Add New Branch"}
          </h2>

          {/* Branch Name */}
          <div>
            <input
              type="text"
              placeholder="Branch Name"
              className="w-full p-3 rounded-lg border border-[#D6BAA6] bg-white focus:outline-none focus:ring-2 focus:ring-[#A47551]"
              {...register("name", { required: "Branch name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <input
              type="text"
              placeholder="Address"
              className="w-full p-3 rounded-lg border border-[#D6BAA6] bg-white focus:outline-none focus:ring-2 focus:ring-[#A47551]"
              {...register("address", { required: "Address is required" })}
            />
            {errors.address && (
              <p className="text-red-500 mt-1">{errors.address.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full p-3 rounded-lg border border-[#D6BAA6] bg-white focus:outline-none focus:ring-2 focus:ring-[#A47551]"
              {...register("phone", { required: "Phone number is required" })}
            />
            {errors.phone && (
              <p className="text-red-500 mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* Open Hours */}
          <div>
            <input
              type="text"
              placeholder="Open Hours (e.g., 8AM - 9PM)"
              className="w-full p-3 rounded-lg border border-[#D6BAA6] bg-white focus:outline-none focus:ring-2 focus:ring-[#A47551]"
              {...register("openHours")}
            />
          </div>

          {/* Image Upload */}
          <div>
            <input
              type="file"
              accept="image/*"
              className="w-full file-input file-input-bordered file-input-sm bg-white"
              {...register("image", {
                required: editingItem ? false : "Image is required",
              })}
            />
            {errors.image && (
              <p className="text-red-500 mt-1">{errors.image.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-[#5A3D2E] text-white px-6 py-2 rounded-lg hover:bg-[#4a3226] transition-all"
            >
              {editingItem ? "Update Branch" : "Create Branch"}
            </button>
          </div>
        </form>
      ) : loadingBranches ? (
        <p>Loading branches...</p>
      ) : errorLoadingBranches ? (
        <p className="text-red-500">Failed to load branches.</p>
      ) : branches.length === 0 ? (
        <p>No branches found.</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border border-[#E6D3C4] shadow-md  mx-auto">
            <table className="min-w-full divide-y divide-[#E6D3C4]">
              <thead className="bg-[#F7EAD7]">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#5A3D2E] uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#5A3D2E] uppercase tracking-wider">
                    Branch Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#5A3D2E] uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#5A3D2E] uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#5A3D2E] uppercase tracking-wider">
                    Open Hours
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-[#5A3D2E] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#E6D3C4]">
                {branches.map((branch) => (
                  <tr
                    key={branch._id}
                    className="hover:bg-[#FAF6F0] transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={branch.image?.url}
                        alt={branch.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[#5A3D2E] font-semibold">
                      {branch.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[#7B5E3C]">
                      {branch.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[#7B5E3C]">
                      {branch.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[#7B5E3C]">
                      {branch.openHours}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center flex justify-center gap-6">
                      <button
                        onClick={() => handleEditClick(branch)}
                        className="text-[#5A3D2E] hover:text-[#A47551] transition-colors"
                        title="Edit"
                      >
                        <LucideEdit size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(branch._id)}
                        className="text-red-600 hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AdminBranches;
