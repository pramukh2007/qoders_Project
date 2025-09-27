import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import receiptRoutes from './routes/receiptRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/api/auth', authRoutes);
app.use('/api/receipts', receiptRoutes);

export default app;