export const PORT = Number(process.env.PORT ?? 5000);
export const JWT_SECRET = process.env.JWT_SECRET ?? 'please_change_this_secret_in_production';

export const PUBLIC_EMAIL_DOMAINS = [
  'gmail.com','yahoo.com','hotmail.com','outlook.com','aol.com',
  'icloud.com','mail.com','gmx.com','live.com','msn.com',
  'yandex.com','protonmail.com','zoho.com'
];
export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
