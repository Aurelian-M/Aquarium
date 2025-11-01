import { Request, Response } from "express";
import { connectDB } from "../db/database";

export const addPurchase = async (req: Request, res: Response) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ error: "Missing userId or productId" });
  }

  try {
    const db = await connectDB();
    
    await db.sql`
      INSERT INTO purchases (userId, productId, quantity, purchaseDate) 
      VALUES (
        ${userId}, 
        ${productId}, 
        ${quantity || 1}, 
        ${new Date().toISOString()}
      )
    `;
  
    return res.status(201).json({ message: "Purchase saved" });

  } catch (error) {
    console.error("addPurchase error:", error);
    res.status(500).json({ error: "Failed to save purchase" });
  }
};

export const getAllPurchases = async (_req: Request, res: Response) => {
  try {
    const db = await connectDB();
  
    const purchases = await db.sql`SELECT * FROM purchases`;
    res.json(purchases);
  } catch (error) {
    console.error("❌ Failed to get all purchases:", error);
    res.status(500).json({ error: "Failed to fetch purchases" });
  }
};

export const getPurchasesByUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const db = await connectDB();
    const purchases = await db.sql`
      SELECT purchases.*, products.name, products.category, products.image, products.price
       FROM purchases 
       JOIN products ON purchases.productId = products.id
       WHERE purchases.userId = ${userId}
    `;

    res.json(purchases);
  } catch (error) {
    console.error("getPurchasesByUser error:", error);
    res.status(500).json({ error: "Failed to get purchases" });
  }
};