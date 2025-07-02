"use client";

import { useState } from "react";
import {
  useGetMenuItemsQuery,
  useAddMenuItemMutation,
  useDeleteMenuItemMutation,
  useUpdateMenuItemMutation,
} from "../../services/menuApi";
import { useForm } from "react-hook-form";
import { LucideEdit, Trash2 } from "lucide-react";

const AdminMenuPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const {
    data: menuItems,
    isLoading: loadingMenuItems,
    isError: errorLoadingMenu,
    refetch,
  } = useGetMenuItemsQuery();
  console.log(menuItems);

  const [addMenuItem, { isLoading: adding }] = useAddMenuItemMutation();
  const [deleteMenuItem, { isLoading: deleting }] = useDeleteMenuItemMutation();
  const [updateMenuItem, { isLoading: updating }] = useUpdateMenuItemMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleAddOrEditMenu = async (formData) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description || "");
      formDataToSend.append("price", formData.price);
      formDataToSend.append("category", formData.category);

      if (formData.image && formData.image[0]) {
        formDataToSend.append("image", formData.image[0]);
      }

      if (editingItem) {
        await updateMenuItem({
          id: editingItem._id,
          body: formDataToSend,
        }).unwrap();
        setEditingItem(null);
      } else {
        await addMenuItem(formDataToSend).unwrap();
      }
      reset();
      setShowForm(false);
      setEditingItem(null);
      refetch();
    } catch (err) {
      console.error("Error saving menu:", err);
      alert("Failed to save menu item. Please try again.");
    }
  };

  const handleEditClick = (item) => {
    setShowForm(true);
    setEditingItem(item);
    reset({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
    });
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure to delete this item?")) {
      try {
        await deleteMenuItem(id).unwrap();
        refetch();
      } catch (err) {
        console.error("Failed to delete menu item:", err);
        alert("Failed to delete menu item. Please try again.");
      }
    }
  };

  return (
    <div className="p-6 bg-[#fdf8f3] min-h-screen">
      <div className="flex justify-between items-center mb-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-[#5A3D2E]">Menu Management</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingItem(null);
            reset();
          }}
          className="px-5 py-2 bg-[#5A3D2E] text-white rounded-lg hover:bg-[#4a3226] transition"
          disabled={adding || updating || deleting}
        >
          {showForm ? "Back to List" : "Create Menu"}
        </button>
      </div>

      {showForm ? (
        <form
          onSubmit={handleSubmit(handleAddOrEditMenu)}
          encType="multipart/form-data"
          className="bg-[#FAF6F0] shadow-lg rounded-2xl p-8 space-y-6 max-w-xl mx-auto border border-[#E6D3C4]"
        >
          <h2 className="text-2xl font-semibold text-[#5A3D2E] text-center mb-4">
            {editingItem ? "Update Menu Item" : "Add New Menu Item"}
          </h2>

          {/* Show current image preview on edit */}
          {editingItem?.image?.url && (
            <div className="flex justify-center mb-4">
              <img
                src={editingItem.image.url}
                alt="Current Menu Item"
                className="w-24 h-24 rounded-lg object-cover"
              />
            </div>
          )}

          {/* Name */}
          <div>
            <input
              {...register("name", { required: "Name is required" })}
              placeholder="Item Name"
              className="w-full p-3 rounded-lg border border-[#D6BAA6] bg-white focus:outline-none focus:ring-2 focus:ring-[#A47551]"
              disabled={adding || updating}
            />
            {errors.name && (
              <p className="text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <textarea
              {...register("description")}
              placeholder="Description (optional)"
              rows={3}
              className="w-full p-3 rounded-lg border border-[#D6BAA6] bg-white focus:outline-none focus:ring-2 focus:ring-[#A47551] resize-none"
              disabled={adding || updating}
            />
          </div>

          {/* Price */}
          <div>
            <input
              type="number"
              step="0.01"
              min="0"
              {...register("price", { required: "Price is required" })}
              placeholder="Price (e.g. 3.99)"
              className="w-full p-3 rounded-lg border border-[#D6BAA6] bg-white focus:outline-none focus:ring-2 focus:ring-[#A47551]"
              disabled={adding || updating}
            />
            {errors.price && (
              <p className="text-red-500 mt-1">{errors.price.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <input
              {...register("category")}
              placeholder="Category (e.g. Coffee, Tea, Dessert)"
              className="w-full p-3 rounded-lg border border-[#D6BAA6] bg-white focus:outline-none focus:ring-2 focus:ring-[#A47551]"
              disabled={adding || updating}
            />
          </div>

          {/* Image Upload */}
          <div>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: !editingItem })}
              className="w-full file-input file-input-bordered file-input-sm bg-white"
              disabled={adding || updating}
            />
            {errors.image && (
              <p className="text-red-500 mt-1">{errors.image.message}</p>
            )}
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              disabled={adding || updating}
              className="bg-[#5A3D2E] text-white px-8 py-2 rounded-lg hover:bg-[#4a3226] transition disabled:opacity-60"
            >
              {editingItem
                ? updating
                  ? "Updating..."
                  : "Update Menu"
                : adding
                ? "Saving..."
                : "Add Menu"}
            </button>
          </div>
        </form>
      ) : loadingMenuItems ? (
        <p className="text-center text-[#5A3D2E]">Loading menu items...</p>
      ) : errorLoadingMenu ? (
        <p className="text-center text-red-600">Failed to load menu items.</p>
      ) : Array.isArray(menuItems) && menuItems.length === 0 ? (
        <p className="text-center text-[#5A3D2E]">No menu items found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[#E6D3C4] shadow-md max-w-5xl mx-auto">
          <table className="min-w-full divide-y divide-[#E6D3C4]">
            <thead className="bg-[#F7EAD7]">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#5A3D2E] uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#5A3D2E] uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#5A3D2E] uppercase tracking-wider">
                  Price ($)
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-[#5A3D2E] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#E6D3C4]">
              {menuItems.items?.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-[#FAF6F0] transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={item.image?.url}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#5A3D2E] font-semibold">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#7B5E3C]">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center flex justify-center gap-6">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:text-red-400 transition-colors disabled:opacity-60"
                      title="Delete"
                      disabled={deleting || adding || updating}
                    >
                      <Trash2 size={20} />
                    </button>
                    <button
                      onClick={() => handleEditClick(item)}
                      className="text-[#5A3D2E] hover:text-[#A47551] transition-colors disabled:opacity-60"
                      title="Edit"
                      disabled={deleting || adding || updating}
                    >
                      <LucideEdit size={20} />
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
};

export default AdminMenuPage;
