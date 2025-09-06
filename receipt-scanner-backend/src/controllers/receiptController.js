import Tesseract from "tesseract.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// 🔹 Helper: extract amount using regex
function extractAmount(text) {
  // Look for line with TOTAL first
  const lines = text.split("\n");
  for (let line of lines) {
    if (/total/i.test(line)) {
      const match = line.match(/(\d+(\.\d{2})?)/);
      if (match) return parseFloat(match[0]);
    }
  }
  // fallback: pick largest number
  const allNumbers = text.match(/\d+(\.\d{2})?/g)?.map(Number) || [];
  return allNumbers.length ? Math.max(...allNumbers) : null;
}

// 🔹 Preview OCR (does not save to DB)
export const previewReceipt = async (req, res) => {
  try {
    const { path } = req.file;
    const result = await Tesseract.recognize(path, "eng");
    const raw_text = result.data.text;
    const ocr_amount = extractAmount(raw_text);
    res.json({ raw_text, ocr_amount });
  } catch (error) {
    res.status(500).json({ message: "OCR failed", error: error.message });
  }
};

// 🔹 Upload receipt (save to DB)
export const uploadReceipt = async (req, res) => {
  try {
    const { path } = req.file;
    const { final_amount } = req.body; // frontend can override
    const result = await Tesseract.recognize(path, "eng");
    const raw_text = result.data.text;
    const ocr_amount = extractAmount(raw_text);

    const saved = await prisma.receipt.create({
      data: {
        userId: req.user.id, // from JWT middleware
        raw_text,
        ocr_amount,
        final_amount: final_amount ? parseFloat(final_amount) : ocr_amount,
      },
    });

    res.json(saved);
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};

// 🔹 List receipts
export const listReceipts = async (req, res) => {
  try {
    const receipts = await prisma.receipt.findMany({
      where: { userId: req.user.id },
      orderBy: { date: "desc" },
    });
    res.json(receipts);
  } catch (error) {
    res.status(500).json({ message: "Fetching receipts failed", error: error.message });
  }
};

// 🔹 Monthly summary
export const summaryReceipts = async (req, res) => {
  try {
    const summary = await prisma.$queryRaw`
      SELECT DATE_TRUNC('month', "date") as month, SUM("final_amount") as total
      FROM "Receipt"
      WHERE "userId" = ${req.user.id}
      GROUP BY month
      ORDER BY month;
    `;
    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: "Summary failed", error: error.message });
  }
};
