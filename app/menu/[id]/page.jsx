"use client";

import Image from "next/image";
import React from "react";
import { useGetMenuItemByIdQuery } from "../../services/menuApi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import AddToCart from "../../components/AddToCart";
import ReviewsSection from "../../components/ReviewSection";

export default function MenuItemPage({ params }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = React.use(params);

  const { data: menuItem, isLoading, isError } = useGetMenuItemByIdQuery(id);

  if (isLoading)
    return (
      <p className="text-center text-[#5A3D2E] mt-10">Loading menu item...</p>
    );
  if (isError || !menuItem)
    return (
      <p className="text-center text-red-600 mt-10">
        Failed to load menu item.
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 bg-[#F5F5F5] text-[#1C1C1C] font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="w-full h-[420px] relative rounded-xl overflow-hidden shadow-xl">
          {menuItem?.image?.url && (
            <Image
              src={menuItem.image.url}
              alt={menuItem.name}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold font-serif text-[#5A3D2E] mb-3">
              {menuItem.name}
            </h1>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              {menuItem.description}
            </p>

            <p className="text-3xl font-semibold text-[#5A3D2E] mb-2">
              ${menuItem.price.toFixed(2)}
            </p>
            <p
              className={`mb-4 font-medium ${
                menuItem.available ? "text-green-700" : "text-red-600"
              }`}
            >
              {menuItem.available ? "Available" : "Currently Unavailable"}
            </p>

            {menuItem.ingredients && (
              <div className="mb-6">
                <h3 className="font-semibold mb-1 text-[#5A3D2E]">
                  Ingredients:
                </h3>
                <ul className="list-disc list-inside text-gray-600">
                  {menuItem.ingredients.map((ing, index) => (
                    <li key={index}>{ing}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {user?.role !== "admin" && (
            <div className="mt-4">
              <AddToCart item={menuItem} />
            </div>
          )}
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-16">
        <ReviewsSection menuId={menuItem._id} user={user} />
      </div>
    </div>
  );
}
