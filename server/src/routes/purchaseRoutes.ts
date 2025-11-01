import { Router } from "express";
import { addPurchase, getPurchasesByUser, getAllPurchases } from "../controllers/purchasesController";

const router = Router();

router.post("/", addPurchase);
router.get("/", getAllPurchases);
router.get("/:userId", getPurchasesByUser);

export default router;
