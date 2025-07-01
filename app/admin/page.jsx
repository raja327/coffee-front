"use client";
import { useGetAllOrdersQuery } from "../services/orderApi";

const AdminDashboard = () => {
  const { data, isLoading } = useGetAllOrdersQuery();
  if (isLoading) return <p>Loading stats</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {/* <StatCard title="Total Users" value={data.users} />
        <StatCard title="Menu Items" value={data.menuItems} />
        <StatCard title="Orders" value={data.orders} />
        <StatCard title="Branches" value={data.branches} />
        <StatCard title="Reviews" value={data.reviews} /> */}
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white p-4 rounded shadow text-center">
    <h4 className="text-lg font-medium">{title}</h4>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default AdminDashboard;
