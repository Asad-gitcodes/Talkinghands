// backend/index.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import uploadRoute from "./routes/upload.route.js";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./db/connectDB.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000; // ✅ PORT 5000 confirmed
const __dirname = path.resolve();

app.use(cors({
  origin: "http://localhost:3000", // ✅ Your frontend URL
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/upload", uploadRoute);
app.use("/api/auth", authRoutes);

// Optional: static build
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("🚀 Server is running on port:", PORT);
});
