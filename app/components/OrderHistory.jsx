import React from "react";
import { useGetMyOrdersQuery } from "@/redux/api/orderApi";

const OrderHistory = () => {
  const { data: orders, isLoading, isError } = useGetMyOrdersQuery();

  if (isLoading) return <p>Loading your orders...</p>;
  if (isError) return <p>Failed to load your order history.</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order._id} className="border p-4 rounded">
              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <div>
                <strong>Items:</strong>
                <ul className="list-disc pl-6">
                  {order.menuItems.map((item) => (
                    <li key={item._id}>
                      {item.name} x {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
