import React from "react";
import { useForm } from "react-hook-form";

const MenuItemForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    onSubmit(data); // Send data to parent or API
    reset(); // Reset form after submission
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-5"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Add Menu Item
      </h2>

      {/* Item Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Item Name
        </label>
        <input
          {...register("name", { required: "Item name is required" })}
          placeholder="Enter item name"
          className="mt-1 w-full border border-gray-300 rounded-md p-2"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          {...register("description")}
          placeholder="Enter description"
          rows="3"
          className="mt-1 w-full border border-gray-300 rounded-md p-2"
        ></textarea>
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Price ($)
        </label>
        <input
          type="number"
          step="0.01"
          {...register("price", {
            required: "Price is required",
            min: { value: 0.1, message: "Price must be at least $0.10" },
          })}
          placeholder="e.g. 4.99"
          className="mt-1 w-full border border-gray-300 rounded-md p-2"
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          {...register("category", { required: "Category is required" })}
          className="mt-1 w-full border border-gray-300 rounded-md p-2"
        >
          <option value="">Select category</option>
          <option value="coffee">Coffee</option>
          <option value="tea">Tea</option>
          <option value="snacks">Snacks</option>
          <option value="desserts">Desserts</option>
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
      </div>

      {/* Image URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Image URL
        </label>
        <input
          {...register("image")}
          placeholder="https://example.com/image.jpg"
          className="mt-1 w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add Item
        </button>
      </div>
    </form>
  );
};

export default MenuItemForm;
