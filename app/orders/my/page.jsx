"use client";

import { useSelector } from "react-redux";
import {
  useDeleteMyOrderMutation,
  useGetMyOrdersQuery,
} from "../../services/orderApi";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const OrderPage = () => {
  const [isClient, setIsClient] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    data: orders,
    isLoading,
    error,
  } = useGetMyOrdersQuery(undefined, { skip: !user });

  const [deleteMyOrder] = useDeleteMyOrderMutation();

  const handleDeleteMyOrder = async (id) => {
    try {
      if (!confirm("Are you sure you want to delete this order?")) return;
      await deleteMyOrder(id);
    } catch (err) {
      console.error(err);
      alert("Failed to delete order");
    }
  };

  if (!isClient) return null;
  if (!user)
    return (
      <p className="text-center mt-6 text-sm">
        Please login to view your orders.
      </p>
    );
  if (isLoading) return <p className="text-center mt-6 text-sm">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-6 text-red-500 text-sm">
        Failed to load orders.
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto mt-6 px-2">
      {orders.length === 0 ? (
        <p className="text-center text-gray-500 text-sm">No orders found.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-gray-200 shadow-sm rounded-lg p-3 flex justify-between items-start text-sm"
            >
              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-x-4">
                  <span className="text-gray-800 font-medium">
                    #{order._id.slice(-6)}
                  </span>
                  <span className="text-gray-500">
                    {format(new Date(order.createdAt), "yyyy-MM-dd")}
                  </span>
                  <span className="capitalize text-gray-600">
                    {order.status}
                  </span>
                </div>

                <ul className="list-disc ml-4 mt-1 text-gray-700">
                  {order.items.map((item) => (
                    <li key={item.menuItem?._id || item._id}>
                      {item.menuItem
                        ? `${item.menuItem.name} × ${item.quantity}`
                        : "Item unavailable"}
                    </li>
                  ))}
                </ul>

                <div className="text-right text-gray-900 font-semibold mt-1">
                  ${order.total.toFixed(2)}
                </div>
              </div>

              <button
                onClick={() => handleDeleteMyOrder(order._id)}
                className="ml-3 p-1 rounded hover:bg-red-100 transition"
                title="Delete"
              >
                <Trash2 size={18} className="text-red-600" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
