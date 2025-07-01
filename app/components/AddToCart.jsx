"use client";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { useRouter } from "next/navigation";

const AddToCart = ({ item }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.auth); // 👈 Get user from Redux

  const handleAddToCart = () => {
    if (!user) {
      router.push("/login"); // 👈 Redirect if not logged in
      return;
    }

    dispatch(addToCart({ ...item, quantity: 1 }));
    router.push("/cart");
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-[#5A3D2E] text-white px-4 py-2 rounded hover:bg-[#3B2619] transition"
    >
      Add to Cart
    </button>
  );
};

export default AddToCart;
