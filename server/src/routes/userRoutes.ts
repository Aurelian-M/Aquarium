import { Router } from "express";
import { registerUser, loginUser, deleteUser, getAllUsersWithPurchases } from "../controllers/authController";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUsersWithPurchases); 
router.delete("/:id", deleteUser);

export default router;  
 