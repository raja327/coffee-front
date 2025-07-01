import { useState } from "react";
import {
  useAddMenuItemMutation,
  useUpdateMenuItemMutation,
  useGetMenuItemsQuery,
  useDeleteMenuItemMutation,
} from "../../services/menuApi";

const AdminMenuManager = () => {
  const { data: menuItems, isLoading } = useGetMenuItemsQuery();
  const [addMenuItem] = useAddMenuItemMutation();
  const [updateMenuItem] = useUpdateMenuItemMutation();
  const [deleteMenuItem] = useDeleteMenuItemMutation();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [editId, setEditId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateMenuItem({ id: editId, menuData: formData });
      setEditId(null);
    } else {
      await addMenuItem(formData);
    }
    setFormData({ name: "", description: "", price: "", category: "" });
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
    });
  };
  const handleDelete = async (id) => {
    if (confirm("are you sure you want to delete this menu item ?")) {
      await deleteMenuItem(id);
    }
  };
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Manage Menu Items</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Item Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="number"
          step="0.01"
          className="w-full border px-3 py-2 rounded"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          placeholder="Category"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {editId ? "update Menu Item" : "Add Menu Item"}
        </button>
      </form>
      {isLoading ? (
        <p>Loading Menu Items...</p>
      ) : (
        <ul className="space-y">
          {menuItems?.map((item) => (
            <li
              key={item._id}
              className="border p-3 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">
                  {item.name}-${item.price}
                </p>
                <p className="text-sm text-gray-600">{description}</p>
                <p className="font-xs text-gray-400">
                  Category:{item.category}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  className="text-blue=600 hover:underline"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminMenuManager;
