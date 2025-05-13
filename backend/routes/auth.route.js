import express from "express";
import { login, logout, signup, checkAuth } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// ✅ Check if user is logged in
router.get("/check-auth", verifyToken, checkAuth);

// ✅ Public Routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
