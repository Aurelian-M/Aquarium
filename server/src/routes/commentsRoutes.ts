import { Router } from "express";
import { addComment, getAllComments, deleteComment } from "../controllers/commentsController";

const router = Router();

router.get("/", getAllComments);
router.post("/", addComment);
router.delete("/:id", deleteComment);

export default router;
