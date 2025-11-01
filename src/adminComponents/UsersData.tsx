
// src/components/UsersData.tsx
import { useEffect, useState } from "react";
import { type Purchase, type RealUser } from "../context/types";

export default function UsersData() {
  const [users, setUsers] = useState<RealUser[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("📡 Starting fetch...");
        // ➡️ Fetch all users with their purchases in a single request
        const res = await fetch("http://localhost:3001/api/users");

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        const usersRole = data.map((user: any) => ({
          ...user,
          role: user.isAdmin === 1 ? "admin" : "user",
        }));
        
        console.log("✅ Data fetched:", usersRole);
        setUsers(usersRole);
      } catch (err) {
        console.error("❌ Fetch error:", err);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`http://localhost:3001/api/users/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`Failed to delete user with id ${id}`);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      console.log(`✅ User ${id} deleted`);
    } catch (error) {
      console.error("❌ Delete error:", error);
    }
  };


  return (
  <div>
    <h2>Customers List:</h2>
    <hr />
    {users.map((user) => (
      <div key={user.id}>
        <div style={{ display: "flex", gap: "1rem" }}>
          <h3>{user.username}</h3>
          <p>{user.role}</p>
          <button onClick={() => handleDelete(user.id)}>❌</button>
        </div>
        <div style={{ marginLeft: "2rem" }}>
          <p><strong>Purchases:</strong></p>
          <ul>
            {(user.purchases && user.purchases.length > 0) ? (
              (user.purchases ?? []).map((purchase: Purchase, index: number) => (
                <li key={index}>
                  {purchase.productName || "Product"} x {purchase.quantity} (${purchase.productPrice || "N/A"})
                </li>
              ))
            ) : (
              <li>No purchases</li>
            )}
          </ul>
        </div>
        <hr />
      </div>
    ))}
  </div>
) }