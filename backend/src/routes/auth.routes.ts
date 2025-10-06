import { Router } from "express";
import { 
  signup, login, refresh, logout, verifyEmail, getMe, 
  forgotPassword, resetPassword 
} from "../controllers/auth.controller";
import { loginLimiter, signupLimiter } from "../config/rateLimiter";
import { authenticateToken } from "../middleware/auth";
import { validateBody } from "../middleware/validate";

const router = Router();

// Signup (rate limited + validated)
router.post(
  "/signup", 
  signupLimiter, 
  validateBody(["email", "password", "category", "role"]), 
  signup
);

// Login (rate limited)
router.post("/login", loginLimiter, login);

router.post("/refresh", refresh);
router.post("/logout", authenticateToken, logout);

// Password flows (rate limited + validated)
router.post("/forgot-password", loginLimiter, validateBody(["email"]), forgotPassword);
router.post("/reset-password/:token", validateBody(["password"]), resetPassword);

// Verification + profile
router.get("/verify", verifyEmail);
router.get("/me", authenticateToken, getMe);

export default router;
