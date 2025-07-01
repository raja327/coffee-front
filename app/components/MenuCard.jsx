"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import AddToCart from "./AddToCart";

const MenuCard = ({ item }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col justify-between max-w-sm">
      <Link href={`/menu/${item._id}`} className="block group">
        <img
          src={item.image.url}
          alt={item.name}
          className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="px-5 pt-4 pb-2">
          <h3 className="text-lg font-bold text-[#5A3D2E] group-hover:text-[#3B2619] transition">
            {item.name}
          </h3>
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">
            {item.description}
          </p>
        </div>
      </Link>

      <div className="px-5 pt-2 pb-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[#5A3D2E] font-semibold text-base">
            ${item.price.toFixed(2)}
          </span>
          <span
            className={`text-sm font-medium ${
              item.available ? "text-green-600" : "text-red-500"
            }`}
          >
            {item.available ? "Available" : "Unavailable"}
          </span>
        </div>

        {user?.role !== "admin" && item.available && <AddToCart item={item} />}
      </div>
    </div>
  );
};

export default MenuCard;
