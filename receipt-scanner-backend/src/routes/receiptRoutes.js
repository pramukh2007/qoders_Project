import express from 'express';
import { uploadReceipt, getReceipts } from '../controllers/receiptController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import multer from 'multer';

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG, and PDF files are allowed'));
    }
  }
});

const router = express.Router();

// Routes
router.post('/', authMiddleware, upload.single('receipt'), uploadReceipt);
router.get('/', authMiddleware, getReceipts);


export default router;