import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import groupRoutes from "./routes/groups.js";
import expenseRoutes from "./routes/expenses.js";

app.use("/api/groups", groupRoutes);
app.use("/api/expenses", expenseRoutes);

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Smart Expense Splitter Backend Running ✅");
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:", err.message);
  });
