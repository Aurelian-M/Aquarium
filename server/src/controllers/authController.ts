import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { connectDB } from "../db/database";

const JWT_SECRET = "your-secret-key"; 


export const registerUser = async (req: Request, res: Response) => {
  console.log("➡️ Incoming registration:", req.body);

  const { username, password, isAdmin } = req.body;

  if (!username || !password || typeof isAdmin !== "boolean") {
    console.log("❌ Invalid registration data");
    return res.status(400).json({ error: "Missing or invalid fields" });
  }

  try {
    const db = await connectDB();

   
    const existing = await db.sql`SELECT * FROM users WHERE username = ${username}`;
    if (existing && existing.length > 0) {
      return res.status(409).json({ error: "Username already exists" });
    }

   
    await db.sql`
      INSERT INTO users (username, password, isAdmin) 
      VALUES (${username}, ${password}, ${isAdmin ? 1 : 0})
    `;
    
   
    const newUserRow = await db.sql`SELECT id, username, isAdmin FROM users WHERE username = ${username}`;

    if (!newUserRow || newUserRow.length === 0) {
      throw new Error("Failed to retrieve new user after insertion.");
    }
    
    const newUser = {
      id: newUserRow[0].id,
      username,
      isAdmin: newUserRow[0].isAdmin === 1,
    };

 
    const allUsers = await db.sql`SELECT id, username, isAdmin FROM users`;
    console.log("📦 All users in DB:", allUsers);

    return res.status(201).json(newUser);
  } catch (error) {
    console.error("❌ Registration error:", error);
    return res.status(500).json({ error: "Registration failed" });
  }
};



export const loginUser = async (req: Request, res: Response) => {

  console.log("➡️ Received Login Request:", req.body);
  const { username, password } = req.body;

  try {
    const db = await connectDB();

    
    const users = await db.sql`
      SELECT * FROM users WHERE username = ${username} AND password = ${password}
    `;
    
   
    if (!users || users.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
    
    const user = users[0];

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        isAdmin: user.isAdmin === 1,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        isAdmin: user.isAdmin === 1,
      },
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    return res.status(500).json({ error: "Login failed" });
  }
};


export const getAllUsersWithPurchases = async (_req: Request, res: Response) => {
  try {
    const db = await connectDB();

    
    const usersWithPurchases = await db.sql`
      SELECT
          u.id AS userId,
          u.username,
          u.isAdmin,
          p.id AS purchaseId,
          p.quantity,
          p.purchaseDate,
           prod.name AS productName,  
          prod.price AS productPrice 
      FROM users u
      LEFT JOIN purchases p ON u.id = p.userId
       LEFT JOIN products prod ON p.productId = prod.id
      ORDER BY u.id
    `;

    const groupedUsers = usersWithPurchases.reduce((acc: Record<number, any>, row: any) => {
      const { userId, username, isAdmin, purchaseId, productName, productPrice, quantity, purchaseDate } = row;
      
      
      const user = acc[userId] || {
        id: userId,
        username,
         isAdmin: isAdmin === 1,
        purchases: [],
      };
       

      if (purchaseId) {
        user.purchases.push({
           purchaseId,
            quantity,
          purchaseDate,
          productName,
          productPrice,
      });
      }
      acc[userId] = user; 
      return acc;
    }, {} as Record<number, any>); 

    return res.json(Object.values(groupedUsers));
  } catch (error) {
    console.error("❌ Failed to fetch users with purchases:", error);
    return res.status(500).json({ error: "Failed to get users with purchases" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const db = await connectDB();
    
    
    const result = await db.sql`DELETE FROM users WHERE id = ${id}`;

   
    res.status(200).json({ message: `User with ID ${id} deleted successfully` });

  } catch (error) {
    console.error("❌ Failed to delete user:", error);
    
    res.status(500).json({ message: "Internal server error" });
  }
};