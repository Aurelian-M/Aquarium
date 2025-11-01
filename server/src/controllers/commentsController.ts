
import { Request, Response } from "express";
import { connectDB } from "../db/database";

export const getAllComments = async (req: Request, res: Response) => {
  try {
    const db = await connectDB();

    const comments = await db.sql`SELECT * FROM comments ORDER BY createdAt DESC`;
    res.json(comments);
  } catch (err) {
    console.error("❌ Error fetching comments:", err);
    res.status(500).json({ error: "Failed to get comments" });
  }
};

export const addComment = async (req: Request, res: Response) => {
  const { text, userId, username, role } = req.body;

  if (!text || !username || !role) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const db = await connectDB();

    // ✅ Correct SQL Cloud syntax
    await db.sql`
      INSERT INTO comments (text, userId, username, role, createdAt)
      VALUES (${text}, ${userId ?? null}, ${username}, ${role}, ${new Date().toISOString()})
    `;


    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error("❌ Error adding comment:", err.message);
    res.status(500).json({ error: "Failed to add comment" });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const db = await connectDB();
    await db.sql`DELETE FROM comments WHERE id = ${id}`;
    res.status(204).send();
  } catch (err: any) {
    console.error("❌ Error deleting comment:", err.message);
    res.status(500).json({ error: "Failed to delete comment" });
  }
};