

import { useContext, useState } from "react";
import { ProductsContext } from "../context/ProductsContext";

export default function ProductsData() {
  const { state } = useContext(ProductsContext);
  const categories = [...new Set(state.items.map(item => item.category))];
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const modifyQuantity = async (id: number) => {
    const quantity = quantities[id];
    const item = state.items.find(p => p.id === id);
    if (!item) return;

    const updatedProduct = { ...item, quantity };

    try {
      const res = await fetch("http://localhost:3001/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( updatedProduct)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update quantity");
      }

      const data = await res.json();
      console.log(data);
      alert("✅ Quantity updated!");
    } catch (err) {
      console.error("❌ Update failed:", err);
    }
  };

  const deleteProduct = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`http://localhost:3001/api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete product");
      }

      const data = await res.json();
      console.log(data);
      alert("🗑️ Product deleted!");
    } catch (err) {
      console.error("❌ Deletion failed:", err);
    }
  };

  return (
    <div>
      {categories.map(cat => (
        <div key={cat}>
          <h2>Category: {cat}</h2>

          {state.items
            .filter(item => item.category === cat)
            .map(item => (
              <div key={item.id}>
                {item.id} - {item.name} — Quantity: {item.quantity}
                <input
                  type="number"
                  min={1}
                  max={999}
                  step={1}
                  value={quantities[item.id] ?? item.quantity}
                  onChange={(e) =>
                    setQuantities({ ...quantities, [item.id]: parseInt(e.target.value) })
                  }
                  style={{ width: "60px", marginLeft: "1rem" }}
                />
                <button onClick={() => modifyQuantity(item.id)}>📝 Update</button>
                <button onClick={() => deleteProduct(item.id)}>❌ Delete</button>
              </div>
            ))}

          <hr />
        </div>
      ))}
    </div>
  );
}
