import express from "express";
import multer from "multer";
import {
  previewReceipt,
  uploadReceipt,
  listReceipts,
  summaryReceipts,
} from "../controllers/receiptController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Routes
router.post("/preview", protect, upload.single("receipt"), previewReceipt);
router.post("/upload", protect, upload.single("receipt"), uploadReceipt);
router.get("/list", protect, listReceipts);
router.get("/summary", protect, summaryReceipts);

export default router;
