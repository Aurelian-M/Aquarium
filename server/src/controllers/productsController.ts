import { Request, Response } from "express";
import { connectDB } from "../db/database";


 export const getAllProducts = async (req: Request, res: Response) => {
  const { category } = req.query;

  try {
    const db = await connectDB();

    let products;

    if (category) {
      products = await db.sql`SELECT * FROM products WHERE category = ${category}`;
    } else {
      products = await db.sql`SELECT * FROM products`;
    }

    res.json(products);
  } catch (error) {
    console.error("Error in getAllProducts:", error);
    res.status(500).json({ error: "Failed to get products" });
  }
}; 

export const addProduct = async (req: Request, res: Response) => {
  const {
    id,
    name,
    category,
    quantity,
    age,
    image,
    environment,
    food,
    maintenance,
    temperature,
    light,
    liked,
    price,
  } = req.body;

  if (!name || !category) {
    return res.status(400).json({ error: "Missing required fields (name, category)" });
  }

  try {
    const db = await connectDB();
    const existing = await db.sql`SELECT * FROM products WHERE id = ${id} OR name = ${name}`;

    if (existing && existing.length > 0) { 
      return res.status(409).json({ error: "Product with this id or name already exists" });
    }

    await db.sql`
      INSERT INTO products (id, name, category, quantity, age, image, environment, food, maintenance, temperature, light, liked, price)
      VALUES (
        ${id}, ${name}, ${category}, ${quantity}, ${age}, ${image}, ${environment}, 
        ${food}, ${maintenance}, ${temperature}, ${light}, ${liked}, ${price}
      )
    `;

    res.status(201).json({ message: "Product added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add product" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id, ...updates } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Missing product id" });
  }

  try {
    const db = await connectDB();
    const existing = await db.sql`SELECT * FROM products WHERE id = ${id}`;

    if (!existing || existing.length === 0) { 
      return res.status(404).json({ error: "Product not found" });
    }

    const fields = Object.keys(updates);
    const values = Object.values(updates);
    const setClause = fields.map(field => `${field} = ?`).join(", ");

    if (!fields.length) {
      return res.status(400).json({ error: "No fields provided for update" });
    }

    await db.sql(`UPDATE products SET ${setClause} WHERE id = ?`, [...values, id]);

    res.json({ message: "Product updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update product" });
  }
};

 export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const db = await connectDB();
    
    await db.sql("DELETE FROM products WHERE id = ?", [id]);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product" });
  }
}; 