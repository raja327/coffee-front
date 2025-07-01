"use client";

import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../redux/slices/cartSlice";
import { usePlaceOrderMutation } from "../services/orderApi";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { useState } from "react";

const CartPage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const total = cartItems.reduce((acc, item) => {
    const price = item?.price ?? 0;
    const quantity = item?.quantity ?? 0;
    return acc + price * quantity;
  }, 0);
  console.log(cartItems);
  const [placeOrder, { isLoading }] = usePlaceOrderMutation();
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");

  const handleCheckOut = async () => {
    if (!phone || !shippingAddress) {
      alert("Phone number and shipping address are required");
      return;
    }
    try {
      const items = cartItems.map((item) => ({
        menuItem: item._id,
        quantity: item.quantity,
      }));

      const response = await placeOrder({
        items,
        total,
        phone,
        shippingAddress,
      });

      if (response?.data) {
        dispatch(clearCart());
        alert("Order placed successfully");
        router.push("/orders/my");
      } else {
        alert("Failed to place order");
      }
    } catch (err) {
      alert("Failed to place order");
    }
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Item</th>
                  <th className="p-3 text-center">Price</th>
                  <th className="p-3 text-center">Quantity</th>
                  <th className="p-3 text-center">Subtotal</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id} className="border-t border-gray-200">
                    <td className="p-3">
                      <h2 className="font-semibold">{item.name}</h2>
                    </td>
                    <td className="p-3 text-center">
                      ${item?.price?.toFixed(2)}
                    </td>
                    <td className="p-3 text-center">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item._id,
                            parseInt(e.target.value)
                          )
                        }
                        min="1"
                        className="w-16 text-center border rounded"
                      />
                    </td>
                    <td className="p-3 text-center">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleRemove(item._id)}
                        className="text-red-600 px-3 py-1 rounded hover:text-black cursor-pointer"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* shipping Info */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Shipping Details</h2>

            <div className="mb-4">
              <label htmlFor="" className="block mb-1 font-medium">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="" className="block mb-1 font-medium">
                Shipping Address
              </label>
              <textarea
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="Enter shipping Address"
                required
              ></textarea>
            </div>
          </div>
          {/* CheckOut Actions */}
          <div className="mt-6 text-right">
            <h3 className="text-xl font-bold mb-2">
              Total: ${total.toFixed(2)}
            </h3>
            <button
              onClick={() => dispatch(clearCart())}
              className="mr-2 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Clear Cart
            </button>
            {user.role !== "admin" && (
              <button
                onClick={handleCheckOut}
                disabled={isLoading}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              >
                {isLoading ? "Processing..." : "Proceed to Checkout"}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
