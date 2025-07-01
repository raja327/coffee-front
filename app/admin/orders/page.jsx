"use client";

import { useSelector } from "react-redux";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../services/orderApi";

const AdminOrdersPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: orders, isLoading, error } = useGetAllOrdersQuery();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus({ orderId, status });
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  };

  if (user?.role !== "admin")
    return (
      <p className="text-center mt-10 text-red-600 text-lg font-semibold">
        Access Denied
      </p>
    );
  if (isLoading)
    return (
      <p className="text-center mt-10 text-[#5A3D2E] font-semibold">
        Loading Orders...
      </p>
    );
  if (error)
    return (
      <p className="text-center mt-10 text-red-600 font-medium">
        Failed to fetch orders
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 mt-12">
      <h1 className="text-3xl font-bold text-[#5A3D2E] mb-6 text-center">
        All Orders
      </h1>
      <div className="overflow-x-auto border border-[#D9C1A3] rounded-xl shadow-md bg-white">
        <table className="min-w-full divide-y divide-[#D9C1A3]">
          <thead className="bg-[#F7EAD7]">
            <tr>
              {[
                "User",
                "Order ID",
                "Total (NPR)",
                "Contact",
                "Shipping Address",
                "Status",
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-6 py-4 text-left text-xs font-semibold text-[#5A3D2E] uppercase tracking-wider"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-[#D9C1A3]">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-[#FAF6F0] transition-all">
                <td className="px-6 py-4 whitespace-nowrap text-[#5A3D2E] font-medium">
                  {order.user?.name || "N/A"}
                </td>
                <td className="px-6 py-4 break-all text-[#7B5E3C]">
                  {order._id}
                </td>
                <td className="px-6 py-4 text-[#7B5E3C]">
                  NPR {order.total.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-[#7B5E3C]">{order.phone}</td>
                <td className="px-6 py-4 text-[#7B5E3C]">
                  {order.shippingAddress}
                </td>
                <td className="px-6 py-4">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="px-3 py-1 rounded-lg border border-[#CBB9A8] bg-[#F9F5F1] text-[#7B5E3C] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A17C5D]"
                  >
                    <option value="pending">Pending</option>
                    <option value="preparing">Preparing</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
