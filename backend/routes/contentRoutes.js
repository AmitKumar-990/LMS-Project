import express from "express";
import { createContent, uploadVideo, uploadThumbnail, deleteContent } from "../controllers/contentController.js";
import upload from "../utils/multerConfig.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// file uploads use 'file' field in form-data
router.post("/upload-video", authMiddleware, upload.single("file"), uploadVideo);
router.post("/upload-thumbnail", authMiddleware, upload.single("file"), uploadThumbnail);

// create content record (provide file urls returned from upload endpoints)
router.post("/create", authMiddleware, createContent);

router.delete("/delete/:id", authMiddleware, deleteContent);

export default router;