import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const prisma = new PrismaClient();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadReceipt = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { final_amount, created_at } = req.body;
    const fileUrl = `/uploads/${req.file.filename}`;
    const userId = req.user.id; // From authMiddleware

    const receipt = await prisma.receipt.create({
      data: {
        userId,
        final_amount: final_amount ? parseFloat(final_amount) : null,
        created_at: created_at ? new Date(created_at) : new Date(),
        fileUrl
      }
    });

    res.status(201).json({ receipt });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReceipts = async (req, res) => {
  try {
    const userId = req.user.id;
    const receipts = await prisma.receipt.findMany({
      where: { userId },
      orderBy: { created_at: 'desc' }
    });

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const receiptsWithUrls = receipts.map(receipt => ({
      ...receipt,
      fileUrl: receipt.fileUrl ? `${baseUrl}${receipt.fileUrl}` : null
    }));

    res.json({ receipts: receiptsWithUrls });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};