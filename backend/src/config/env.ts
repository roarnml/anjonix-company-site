import dotenv from "dotenv";
dotenv.config();

const required = ["JWT_SECRET", "SMTP_USER", "SMTP_PASS"];
for (const key of required) {
  if (!process.env[key]) throw new Error(`Missing env var: ${key}`);
}
