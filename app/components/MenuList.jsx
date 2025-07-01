import { useGetMenuItemsQuery } from "@/redux/api/menuApi";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";

export default function MenuList() {
  const { data: menuItems, isLoading } = useGetMenuItemsQuery();
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  if (isLoading) return <p>Loading menu...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {menuItems?.map((item) => (
        <div key={item._id} className="bg-white p-4 rounded shadow">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-40 object-cover rounded"
          />
          <h3 className="text-lg font-bold mt-2">{item.name}</h3>
          <p className="text-sm text-gray-600">{item.description}</p>
          <p className="text-md font-semibold mt-1">${item.price}</p>
          <button
            className="mt-2 px-4 py-1 bg-green-600 text-white rounded"
            onClick={() => handleAddToCart(item)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
