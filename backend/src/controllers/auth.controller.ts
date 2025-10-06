import { Request, Response } from "express";
import prisma from "../../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { JWT_SECRET } from "../config/constant";
import { generateVerificationToken, normalizeRole } from "../utils/auth";
import { sendEmail } from "../utils/email";

export async function signup(req: Request, res: Response) {
  // copy your signup logic here (cleaned version)
  try {
    const { 
      email, password, category, role, 
      organizationId, newOrganizationName, newOrganizationDomain 
    } = req.body;

    // 1. Required fields
    if (!email || !password || !category || !role) {
      return res.status(400).json({ error: "Missing required fields: email, password, category, role" });
    }

    const cat = category.toLowerCase();
    const normalizedRole = normalizeRole(role);

    // 2. Validate category
    if (!["enterprise", "institution", "online"].includes(cat)) {
      return res.status(400).json({ error: "Invalid category" });
    }

    // 3. Validate roles
    if (cat === "online" && !["student", "instructor"].includes(normalizedRole)) {
      return res.status(403).json({ error: "Online signup allowed only for student/instructor" });
    }
    if (cat !== "online" && !["management", "instructor", "student"].includes(normalizedRole)) {
      return res.status(403).json({ error: "Invalid role for enterprise/institution" });
    }

    // 4. Prevent duplicates
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: "A user with that email already exists" });
    }

    let org = null;
    let orgNameForUser: string | null = null;

    // 5. Organization logic
    if (cat !== "online") {
      if (organizationId) {
        // Attach to existing org
        org = await prisma.organization.findUnique({ where: { id: organizationId } });
        if (!org) return res.status(400).json({ error: "Organization not found" });

        const emailDomain = email.split("@")[1];
        if (emailDomain !== org.allowedDomain) {
          return res.status(403).json({ error: "Email domain does not match organization" });
        }
        orgNameForUser = org.name;

      } else if (newOrganizationName && newOrganizationDomain) {
        // Create new org
        org = await prisma.organization.create({
          data: {
            name: newOrganizationName,
            allowedDomain: newOrganizationDomain,
          },
        });
        orgNameForUser = org.name;

      } else {
        // No org info → redirect frontend to KYC
        return res.status(409).json({
          action: "organizationKYCRequired",
          message: "Organization details missing. Redirect to KYC page.",
        });
      }
    }

    // 6. Hash password & create user
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        category: cat,
        role: normalizedRole,
        orgName: orgNameForUser ?? undefined,
        verified: false,
        organization: org ? { connect: { id: org.id } } : undefined,
      },
    });

    // 7. Send verification email
    const verificationToken = generateVerificationToken(user.id);
    const verificationLink = `${process.env.FRONTEND_URL}/verify?token=${verificationToken}`;
    await sendSignupEmail(user.email, verificationLink);

    return res.status(201).json({
      message: "Signup successful! Please check your email to verify your account.",
    });

  } catch (err) {
    console.error("signup error", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}


export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Missing email or password" });
    }

    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Validate password
    const pwdOk = await bcrypt.compare(password, user.passwordHash);
    if (!pwdOk) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Check email verification
    if (!user.verified) {
      const verificationToken = generateVerificationToken(user.id);
      const verificationLink = `${process.env.FRONTEND_URL}/verify?token=${verificationToken}`;
      await sendSignupEmail(user.email, verificationLink);

      return res.status(403).json({
        error: "Email not verified",
        action: "resendVerification",
        message: "A new verification email has been sent to your inbox",
      });
    }

    // Generate tokens
    const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    // Set cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 min
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Create session
    const token = uuidv4();
    const now = new Date();
    await prisma.session.create({
      data: { userId: user.id, token, lastActive: now },
    });

    return res.json({
      token,
      user: {
        email: user.email,
        category: user.category,
        role: user.role,
        orgName: user.orgName ?? null,
      },
      expiresAt: new Date(now.getTime() + 30 * 60 * 1000), // 30 minutes
    });

  } catch (err) {
    console.error("login error", err);
    return res.status(500).json({ error: "Internal server error" });
  }

}

export async function refresh(req: Request, res: Response) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ error: "Missing refresh token" });
    }

    // Verify refresh token
    let decoded: any;
    try {
      decoded = jwt.verify(refreshToken, JWT_SECRET);
    } catch (err) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    // Check refresh token matches stored value
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ error: "Refresh token not valid" });
    }

    // Issue new tokens
    const newAccessToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "15m" });
    const newRefreshToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: newRefreshToken },
    });

    // Reset cookies
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ accessToken: newAccessToken });

  } catch (err) {
    console.error("refresh error", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function logout(req: Request, res: Response) {
   try {
    const token = req.headers["x-session-token"] as string;
    if (!token) {
      return res.status(400).json({ error: "Missing session token" });
    }

    // Mark session inactive
    await prisma.session.updateMany({
      where: { token, isActive: true },
      data: { isActive: false },
    });

    // Clear cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("logout error", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// ✅ verifyEmail
export async function verifyEmail(req: Request, res: Response) {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).json({ error: "Missing token" });

    let decoded: any;
    try {
      decoded = jwt.verify(token as string, JWT_SECRET);
    } catch {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    const user = await prisma.user.update({
      where: { id: decoded.userId },
      data: { verified: true },
    });

    return res.json({ message: "Email verified successfully", email: user.email });
  } catch (err) {
    console.error("verifyEmail error", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// ✅ forgotPassword
export async function forgotPassword(req: Request, res: Response) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: "No account with that email" });

    const resetToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await sendEmail(user.email, "Password Reset", `Click to reset: ${resetLink}`);

    return res.json({ message: "Password reset link sent to your email" });
  } catch (err) {
    console.error("forgotPassword error", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// ✅ resetPassword
export async function resetPassword(req: Request, res: Response) {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!token || !newPassword) return res.status(400).json({ error: "Missing fields" });

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch {
      return res.status(400).json({ error: "Invalid or expired reset token" });
    }

    const hash = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: decoded.userId },
      data: { passwordHash: hash },
    });

    return res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("resetPassword error", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// ✅ getMe
export async function getMe(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, category: true, role: true, orgName: true, verified: true },
    });

    return res.json(user);
  } catch (err) {
    console.error("getMe error", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
