"use client";
import { useState } from "react";
import MenuCard from "../components/MenuCard";
import { useGetMenuItemsQuery } from "../services/menuApi";
import Pagination from "../components/Pagination";

function MenuPage() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading, isError } = useGetMenuItemsQuery({ page, limit });

  const menuItems = data?.items || [];
  const totalMenuItems = data?.pagination?.pages || 1;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-[#5A3D2E] font-medium">
        Loading coffee menu...
      </div>
    );
  }

  if (isError || !menuItems) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-red-600 font-semibold">
        Failed to load menu. Please try again later.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-4 px-4 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {menuItems.map((item, index) => (
          <MenuCard key={item._id || index} item={item} />
        ))}
      </div>

      {totalMenuItems > 1 && (
        <div className="mt-12">
          <Pagination
            currentPage={page}
            totalPages={totalMenuItems}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      )}
    </div>
  );
}

export default MenuPage;
