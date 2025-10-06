// src/services/emailService.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendSignupEmail(userEmail: string, verificationLink: string) {
  const subject = "Verify Your Email";
  const html = `
    <p>Hi,</p>
    <p>Thanks for signing up! Click the link below to verify your email:</p>
    <a href="${verificationLink}">Verify Email</a>
    <p>If you didn't sign up, ignore this message.</p>
  `;

  await transporter.sendMail({
    from: `"Support" <${process.env.SMTP_FROM}>`,
    to: userEmail,
    subject,
    html,
  });
}
