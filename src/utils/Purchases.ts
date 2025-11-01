// src/utils/purchase.ts


export async function savePurchase(
  userId: number,
  productId: number,
  quantity: number,
  token: string
) {
  try {
    const response = await fetch("http://localhost:3001/api/purchase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify({ userId, productId, quantity }),
    });

    if (!response.ok) {
      console.error("Failed to save purchase:", response.status);
      return false;
    }

    console.log("Purchase saved successfully!");
    return true;
  } catch (error) {
    console.error("Purchase error:", error);
    return false;
  }
}