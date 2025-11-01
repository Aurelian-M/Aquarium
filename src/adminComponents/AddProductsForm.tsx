

import { useState } from "react";
import type { Category } from "../context/types";

export default function AddProductForm() {
  const [product, setProduct] = useState<{
    id: number;
    name: string;
    category: Category;
    quantity: number;
    price: number;
    image: string;
  }>({
    id: Date.now(),
    name: "",
    category: "fishes",
    quantity: 1,
    price: 0,
    image: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]:
        name === "id" || name === "quantity" || name === "price"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to add product");
      }

      const data = await res.json();
      console.log(data);
      alert("✅ Product added successfully");
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Failed to add product.");
    }
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h3>Add Product</h3>

      <input
        name="id"
        placeholder="ID"
        type="number"
        value={product.id}
        onChange={handleChange}
      />
      <input
        name="name"
        placeholder="Name"
        value={product.name}
        onChange={handleChange}
      />
      <select
        name="category"
        value={product.category ?? ""}
        onChange={handleChange}
      >
        <option value="fishes">Fishes</option>
        <option value="plants">Plants</option>
        <option value="food">Food</option>
      </select>
      <input
        name="quantity"
        type="number"
        value={product.quantity}
        onChange={handleChange}
      />
      <input
        name="price"
        type="number"
        step="0.01"
        value={product.price}
        onChange={handleChange}
      />
      <input
        name="image"
        placeholder="Image path (e.g. ../src/pictures/fish1.jpeg)"
        value={product.image}
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>➕ Add Product</button>
    </div>
  );
}
