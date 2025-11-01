// src/models/fishModel.ts
import { connectDB } from "../db/database";
export const getAllProductsFromDB = async () => {
    const db = await connectDB();
    return db.all("SELECT * FROM products;");
};
