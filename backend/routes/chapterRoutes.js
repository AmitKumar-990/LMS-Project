import express from "express";
import { createChapter, updateChapter, deleteChapter } from "../controllers/chapterController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createChapter);
router.put("/update/:id", authMiddleware, updateChapter);
router.delete("/delete/:id", authMiddleware, deleteChapter);

export default router;