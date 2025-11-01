
// src/routes/productsRoutes.ts
import { Router } from "express";
import { getAllProducts, deleteProduct, addProduct, updateProduct } from "../controllers/productsController"; 


const router = Router();

 
router.get("/", getAllProducts);
router.post("/", addProduct);
router.put("/", updateProduct);
router.delete("/:id", deleteProduct);
export default router;    
