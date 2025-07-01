import React, { useState } from "react";
import { useGetAllOrdersQuery } from "../../services/orderApi";

const AdminOrderManager = () => {
  const { data: orders, isLoading } = useGetAllOrdersQuery();
  const [updateStatus] = useUpdateOrderStatusMutation();
  const [updatingId, setUpdatingId] = useState(null);

  const handleStatusChange = async (orderId, status) => {
    setUpdatingId(orderId);
    await updateStatus({ orderId, status });
    setUpdatingId(null);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Manage Orders</h2>
      {isLoading ? (
        <p>Loading orders...</p>
      ) : (
        <ul className="space-y-4">
          {orders?.map((order) => (
            <li className="border rounded p-4 bg-white shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">
                    Order # {order._id.slice(-5).toUpperCase()}
                  </p>
                  <p className="text-sm text-gray-600">
                    User:{order.user?.name || "Unknown"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Total: ${order.totalAmount}
                  </p>
                  <ul className="text-xs mt-2">
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.name}*{item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <select
                    value={order.status}
                    onChange={(e) => {
                      handleStatusChange(order._id, e.target.value);
                    }}
                    className="border rounded px-2 py-1"
                    disabled={updatingId === order._id}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default AdminOrderManager;
