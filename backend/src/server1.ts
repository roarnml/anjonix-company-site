import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
//import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import nodemailer from "nodemailer";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import { v4 as uuidv4 } from "uuid";



const prisma = new PrismaClient();
const app = express();
const PORT = Number(process.env.PORT ?? 5000);
const JWT_SECRET = process.env.JWT_SECRET ?? 'please_change_this_secret_in_production';

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


// Rate limiter for login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { error: "Too many login attempts, try again later." },
});

// Public email domains
const PUBLIC_EMAIL_DOMAINS = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com',
  'icloud.com', 'mail.com', 'gmx.com', 'live.com', 'msn.com', 'yandex.com',
  'protonmail.com', 'zoho.com'
];
const sessionMiddleware = async (req, res, next) => {
  const token = req.headers['x-session-token'] as string;
  if (!token) return res.status(401).json({ error: "Missing session token" });

  const session = await prisma.session.findUnique({ where: { token } });
  if (!session || !session.isActive) {
    return res.status(401).json({ error: "Invalid session" });
  }

  await prisma.session.update({
    where: { token },
    data: { lastActive: new Date() }
  });

  req.userId = session.userId; // attach to request
  next();
};

import { sendEmail } from "./utils/email";
import jwt from "jsonwebtoken";

function generateToken(userId: string) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET!, { expiresIn: "1h" });
}

async function sendSignupEmail(userEmail: string, verificationLink: string) {
  const subject = "Verify Your Email";

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Email Verification</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; padding: 40px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 8px; padding: 40px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <tr>
                  <td align="center" style="font-size: 24px; font-weight: bold; color: #333;">
                    Verify Your Email
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px 0; font-size: 16px; color: #555;">
                    <p>Hi,</p>
                    <p>Thanks for signing up! Please confirm your email address by clicking the button below:</p>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <a href="${verificationLink}" 
                      style="display: inline-block; padding: 12px 24px; font-size: 16px; 
                             color: #ffffff; background-color: #007bff; text-decoration: none; 
                             border-radius: 5px; font-weight: bold;">
                      Verify Email
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px 0; font-size: 14px; color: #777;">
                    <p>If you didn’t create an account, you can safely ignore this email.</p>
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 12px; color: #aaa; text-align: center;">
                    © ${new Date().getFullYear()} Your App Name. All rights reserved.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  await sendEmail({ to: userEmail, subject, html });
}



function domainFromEmail(email: string | undefined): string | null {
  if (!email) return null;
  const parts = email.split('@');
  if (parts.length !== 2) return null;
  return parts[1].toLowerCase();
}

function generateVerificationToken(userId: number) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '15m' });
}

async function sendVerificationEmail(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const link = `http://localhost:${PORT}/auth/verify?token=${token}`;

  await transporter.sendMail({
    from: '"Tech Platform" <no-reply@yourapp.com>',
    to: email,
    subject: "Verify your account",
    html: `<p>Click to verify: <a href="${link}">${link}</a></p>`,
  });
}

function isPublicEmail(email: string) {
  const domain = domainFromEmail(email);
  if (!domain) return false;
  return PUBLIC_EMAIL_DOMAINS.some(d => domain === d || domain.endsWith('.' + d));
}

function normalizeRole(raw?: string): 'management' | 'instructor' | 'student' {
  if (!raw) return 'student';
  const r = raw.toLowerCase();
  if (r.includes('management')) return 'management';
  if (r.includes('instructor')) return 'instructor';
  if (r.includes('student')) return 'student';
  return 'student';
}

// ------------------------- ROUTES -------------------------
// GET /organizations/kyc
app.post("/organization/kyc", async (req, res) => {
  const { orgName, allowedDomain, address, contactEmail, phone, website, description } = req.body;

  if (!orgName || !allowedDomain) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const org = await prisma.organization.create({
      data: { 
        name: orgName, 
        allowedDomain,
        address,
        website,
      },
    });
    res.json({ message: "Organization KYC saved successfully", org });
  } catch (err: any) {
    console.error("Organization KYC error:", err);
    res.status(500).json({ error: "Failed to save organization details" });
  }
});

// GET /organizations/check-domain?domain=example.com
app.get("/organizations/check-domain", async (req, res) => {
  const { domain } = req.query;
  if (!domain) return res.status(400).json({ error: "Domain required" });

  const org = await prisma.organization.findUnique({
    where: { allowedDomain: domain.toString().toLowerCase() },
  });

  res.json({ exists: !!org, org });
});

// GET /organizations
// Create organization KYC endpoint
app.post("/organizations", async (req, res) => {
  try {
    const { orgName, allowedDomain, address, contactEmail, contactPhone, website, description } = req.body;

    if (!orgName || !allowedDomain) {
      return res.status(400).json({ message: "orgName and allowedDomain are required" });
    }

    const newOrg = await prisma.organization.create({
      data: { 
        name: orgName, 
        allowedDomain,
        address,
        contactEmail,
        contactPhone,
        website,
        description
      },
    });

    res.status(201).json(newOrg);
  } catch (err) {
    console.error("Error creating organization:", err);
    res.status(500).json({ message: "Failed to create organization" });
  }
});

// Optional: fetch all organizations for dropdowns
app.get("/organizations", async (req, res) => {
  try {
    const orgs = await prisma.organization.findMany();
    res.json(orgs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch organizations" });
  }
});

/*app.post('/auth/signup', async (req, res) => {
  try {
    const { email, password, category, role, organizationId, newOrganizationName, newOrganizationDomain } = req.body as {
      email?: string;
      password?: string;
      category?: string;
      role?: string;
      organizationId?: number;
      newOrganizationName?: string;
      newOrganizationDomain?: string;
    };

    if (!email || !password || !category || !role) {
      return res.status(400).json({ error: 'Missing required fields: email, password, category, role' });
    }

    const cat = category.toLowerCase();
    const normalizedRole = normalizeRole(role);

    // Validate category & role
    if (!['enterprise', 'institution', 'online'].includes(cat)) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    const allowedRoles = ['management', 'instructor'];
    if (cat !== 'online' && !allowedRoles.includes(normalizedRole)) {
      return res.status(403).json({ error: 'Sign up not allowed for this role/category' });
    }

    // Prevent duplicates
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ error: 'A user with that email already exists' });

    let org = null;
    let orgNameForUser = null;

   if (cat !== 'online') {
        if (organizationId) {
            // Existing organization
            org = await prisma.organization.findUnique({ where: { id: organizationId } });
            if (!org) return res.status(400).json({ error: 'Organization not found' });

            const emailDomain = email.split('@')[1];
            if (emailDomain !== org.allowedDomain) {
            return res.status(403).json({ error: 'Email domain does not match organization' });
            }

            orgNameForUser = org.name;

        } else if (newOrganizationName && newOrganizationDomain) {
            // Create new organization immediately
            org = await prisma.organization.create({
            data: {
                name: newOrganizationName,
                allowedDomain: newOrganizationDomain,
            },
            });
            orgNameForUser = org.name;

        } else {
            // Instead of sending 400, send a special flag
            return res.status(409).json({
            action: 'organizationKYCRequired',
            message: 'Organization details missing. Redirect to KYC page.'
            });
        }
        }


    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        category: cat as any,
        role: normalizedRole as any,
        orgName: orgNameForUser ?? undefined,
        verified: false,
        organization: org ? { connect: { id: org.id } } : undefined,
      },
    });
    // Send verification email
    console.log("User Email:", user.email)
    const verificationToken = generateVerificationToken(user.id);
    const verificationLink = `http://localhost:3000/verify?token=${verificationToken}`;

    
    await sendSignupEmail(user.email, verificationLink);




    return res.status(201).json({
      message: 'Signup successful! Please check your email to verify your account.',
    });
  } catch (err) {
    console.error('signup error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


app.post("/auth/login", loginLimiter, async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Missing email or password" });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const pwdOk = await bcrypt.compare(password, user.passwordHash);
  if (!pwdOk) return res.status(400).json({ error: "Invalid credentials" });

  // --- Check verification ---
  if (!user.verified) {
    // generate new verification token
    console.log("User Id: ", user.id)
    const verificationToken = generateToken(`${user.id}`); // JWT or random token
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

    // send verification email
    await sendEmail({
      to: email,
      subject: "Verify your email",
      html: `<p>Hi! You tried logging in. Please verify your email by clicking this link:</p>
             <a href="${verificationLink}">Verify Email</a>`,
    });

    // respond with 403 and signal frontend to show "Check email / resend email" message
    return res.status(403).json({
      error: "Email not verified",
      action: "resendVerification",
      message: "A new verification email has been sent to your inbox",
    });
  }

  // --- Continue login for verified users ---
  const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });

  await prisma.user.update({ where: { id: user.id }, data: { refreshToken } });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  const token = uuidv4(); // simple session token
  const now = new Date();

  await prisma.session.create({
    data: { userId: user.id, token, lastActive: now },
  });

  res.json({
    token,
    user: { email: user.email, category: user.category, role: user.role },
    expiresAt: new Date(now.getTime() + 30 * 60 * 1000), // 30 mins
  });
});*/

// --- AUTH SIGNUP ---
app.post('/auth/signup', async (req, res) => {
  try {
    const { 
      email, password, category, role, 
      organizationId, newOrganizationName, newOrganizationDomain 
    } = req.body;

    if (!email || !password || !category || !role) {
      return res.status(400).json({ error: 'Missing required fields: email, password, category, role' });
    }

    const cat = category.toLowerCase();
    const normalizedRole = normalizeRole(role);

    // 1. Validate category
    if (!['enterprise', 'institution', 'online'].includes(cat)) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    // 2. Validate roles
    if (cat === 'online' && !['student', 'instructor'].includes(normalizedRole)) {
      return res.status(403).json({ error: 'Online signup allowed only for student/instructor' });
    }
    if (cat !== 'online' && !['management', 'instructor', 'student'].includes(normalizedRole)) {
      return res.status(403).json({ error: 'Invalid role for enterprise/institution' });
    }

    // 3. Prevent duplicates
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ error: 'A user with that email already exists' });

    let org = null;
    let orgNameForUser = null;

    // 4. Organization logic
    if (cat !== 'online') {
      if (organizationId) {
        // Attach to existing org
        org = await prisma.organization.findUnique({ where: { id: organizationId } });
        if (!org) return res.status(400).json({ error: 'Organization not found' });

        const emailDomain = email.split('@')[1];
        if (emailDomain !== org.allowedDomain) {
          return res.status(403).json({ error: 'Email domain does not match organization' });
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
        // No org info provided → tell frontend to redirect to KYC
        return res.status(409).json({
          action: 'organizationKYCRequired',
          message: 'Organization details missing. Redirect to KYC page.'
        });
      }
    }

    // 5. Hash password & create user
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

    // 6. Send verification email
    const verificationToken = generateVerificationToken(user.id);
    const verificationLink = `${process.env.FRONTEND_URL}/verify?token=${verificationToken}`;
    await sendSignupEmail(user.email, verificationLink);

    return res.status(201).json({
      message: 'Signup successful! Please check your email to verify your account.',
    });

  } catch (err) {
    console.error('signup error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


// --- AUTH LOGIN ---
app.post("/auth/login", loginLimiter, async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Missing email or password" });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const pwdOk = await bcrypt.compare(password, user.passwordHash);
  if (!pwdOk) return res.status(400).json({ error: "Invalid credentials" });

  // --- Check verification ---
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

  // --- Generate tokens ---
  const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });

  await prisma.user.update({ where: { id: user.id }, data: { refreshToken } });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  const token = uuidv4();
  const now = new Date();

  await prisma.session.create({
    data: { userId: user.id, token, lastActive: now },
  });

  res.json({
    token,
    user: { 
      email: user.email, 
      category: user.category, 
      role: user.role, 
      orgName: user.orgName ?? null 
    },
    expiresAt: new Date(now.getTime() + 30 * 60 * 1000),
  });
});

app.post('/auth/logout', async (req, res) => {
  const token = req.headers['x-session-token'] as string;
  if (!token) return res.status(400).json({ error: 'Missing session token' });

  await prisma.session.updateMany({
    where: { token, isActive: true },
    data: { isActive: false }
  });

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully" });
});


// GET /auth/verify
app.get("/auth/verify", async (req, res) => {
  const { token } = req.query;
  if (!token || typeof token !== "string") return res.status(400).send("Missing token");

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: number };
    await prisma.user.update({ where: { id: payload.userId }, data: { verified: true } });
    res.send("✅ Email verified! You can now log in.");
  } catch {
    res.status(400).send("❌ Invalid or expired token");
  }
});

// JWT middleware
function authenticateToken(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && typeof authHeader === 'string' ? authHeader.split(' ')[1] : null;
  if (!token) return res.status(401).json({ error: 'Missing token' });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    (req as any).user = payload;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// GET /auth/me
/*app.get('/auth/me', authenticateToken, async (req, res) => {
  try {
    const userPayload = (req as any).user as { userId: number };
    const user = await prisma.user.findUnique({
      where: { id: userPayload.userId },
      select: { id: true, email: true, category: true, role: true, orgName: true, createdAt: true },
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (err) {
    console.error('me error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});*/

// GET /auth/me
app.get('/auth/me', authenticateToken, async (req, res) => {
  try {
    // Extract userId from token payload (from your middleware)
    const userPayload = (req as any).user as { userId: number };

    // Fetch the **active session** for this user
    const session = await prisma.session.findFirst({
      where: { userId: userPayload.userId },
      orderBy: { lastActive: 'desc' }, // get the most recent session
    });

    if (!session) return res.status(401).json({ error: 'No active session' });

    // Check if session has expired (30 mins timeout)
    const now = new Date();
    const diff = now.getTime() - session.lastActive.getTime();
    if (diff > 30 * 60 * 1000) {
      await prisma.session.delete({ where: { id: session.id } });
      return res.status(401).json({ error: 'Session expired' });
    }

    // Update lastActive
    await prisma.session.update({
      where: { id: session.id },
      data: { lastActive: now },
    });

    // Fetch the user info
    const user = await prisma.user.findUnique({
      where: { id: userPayload.userId },
      select: { id: true, email: true, category: true, role: true, orgName: true, createdAt: true },
    });

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ user });
  } catch (err) {
    console.error('me error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


// -------- Resources Routes ----
// Fetch resources, scoped to org
app.post('/api/resources', sessionMiddleware, async (req, res) => {
  const { title, type, url, courseId } = req.body;
  const user = await prisma.user.findUnique({ where: { id: req.userId } });

  const resource = await prisma.resource.create({
    data: {
      title,
      type,
      url,
      courseId,
      uploadedBy: user!.id,
      organizationId: user!.organizationId!,
    }
  });

  res.status(201).json(resource);
});

app.get('/api/resources', sessionMiddleware, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  const resources = await prisma.resource.findMany({
    where: { organizationId: user?.organizationId }
  });
  res.json(resources);
});

// ------- Bookings Routes ----
app.post('/api/bookings', sessionMiddleware, async (req, res) => {
  const { instructorId } = req.body;
  const student = await prisma.user.findUnique({ where: { id: req.userId } });
  if (!student) return res.status(404).json({ error: "Student not found" });

  const booking = await prisma.booking.create({
    data: {
      studentId: student.id,
      instructorId,
      organizationId: student.organizationId!,
      status: "pending",
    }
  });

  res.status(201).json(booking);
});

app.get('/api/bookings', sessionMiddleware, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  const bookings = await prisma.booking.findMany({
    where: { organizationId: user?.organizationId }
  });
  res.json(bookings);
});

// ------- Forum Routes -----
app.post('/api/forum', sessionMiddleware, async (req, res) => {
  const { title, content } = req.body;
  const user = await prisma.user.findUnique({ where: { id: req.userId } });

  const post = await prisma.forumPost.create({
    data: {
      title,
      content,
      userId: user!.id,
      organizationId: user!.organizationId!,
    }
  });

  res.status(201).json(post);
});

app.get('/api/forum', sessionMiddleware, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  const posts = await prisma.forumPost.findMany({
    where: { organizationId: user?.organizationId },
    include: { user: true }
  });
  res.json(posts);
});

app.post('/api/forum/:postId/comments', sessionMiddleware, async (req, res) => {
  const { content } = req.body;
  const user = await prisma.user.findUnique({ where: { id: req.userId } });

  const comment = await prisma.forumComment.create({
    data: {
      content,
      userId: user!.id,
      postId: req.params.postId
    }
  });

  res.status(201).json(comment);
});


// ------- Admin Routes -----

// Get all orgs (admin only)
app.get('/api/organizations', async (req, res) => {
  const orgs = await prisma.organization.findMany();
  res.json(orgs);
});

// Get org by id
app.get('/api/organizations/:id', async (req, res) => {
  const org = await prisma.organization.findUnique({ where: { id: Number(req.params.id) }});
  if (!org) return res.status(404).json({ error: "Organization not found" });
  res.json(org);
});


app.listen(PORT, () => {
  console.log(`Auth server listening on http://localhost:${PORT}`);
});
