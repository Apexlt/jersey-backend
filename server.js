import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import paymentRoutes from "./routes/payment.js";

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/payment", paymentRoutes);

// HOME TEST
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// 🔥 MONGODB CONNECT (IMPROVED)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("🟢 MongoDB connected successfully"))
  .catch(err => {
    console.log("🔴 DB Error:", err.message);
    process.exit(1); // stops server if DB fails
  });

// START SERVER
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});