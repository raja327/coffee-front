import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <aside className="fixed top-0 left-0 w-50 h-screen bg-black text-white p-4 flex flex-col z-50">
      <Link href="/admin/" className="text-xl font-bold mb-6">
        Admin Panel
      </Link>

      {/* Menu Links */}
      <nav className="flex-1 space-y-2">
        <Link href="/admin/" className="block hover:text-gray-300">
          Dashboard
        </Link>
        <Link href="/admin/users" className="block hover:text-gray-300">
          Users
        </Link>
        <Link href="/admin/menu" className="block hover:text-gray-300">
          Menu Items
        </Link>
        <Link href="/admin/orders" className="block hover:text-gray-300">
          Orders
        </Link>
        <Link href="/admin/branches" className="block hover:text-gray-300">
          Branches
        </Link>
        <Link href="/admin/reviews" className="block hover:text-gray-300">
          Reviews
        </Link>
      </nav>

      {/* Logout Button at Bottom */}
      <div className="mt-auto pt-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-500 hover:text-red-400"
        >
          <LogOutIcon size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
