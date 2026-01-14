// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import groupRoutes from "./routes/groups.js";
import expenseRoutes from "./routes/expenses.js";

dotenv.config();

// ✅ 1. CREATE APP FIRST
const app = express();

// ✅ 2. MIDDLEWARE
app.use(cors());
app.use(express.json());

// ✅ 3. ROUTES (AFTER app is created)
app.use("/api/auth", authRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/expenses", expenseRoutes);

// ✅ 4. TEST ROUTE
app.get("/", (req, res) => {
  res.send("Smart Expense Splitter Backend Running ✅");
});

// ✅ 5. DB CONNECT
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// ✅ 6. START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
