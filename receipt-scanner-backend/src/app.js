import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import receiptRoutes from "./routes/receiptRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/receipts", receiptRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
