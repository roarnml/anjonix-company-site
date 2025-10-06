import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { PORT } from './config/constant';
import { errorHandler } from './middleware/errorHandler';

// Routes
import authRoutes from './routes/auth.routes';
import orgRoutes from './routes/organization.routes';
import resourceRoutes from './routes/resource.routes';
import bookingRoutes from './routes/booking.routes';
import forumRoutes from './routes/forum.routes';
import adminRoutes from './routes/admin.routes';

// 👉 new imports for completeness
import courseRoutes from './routes/course.routes';
import notificationRoutes from './routes/notification.routes';
import attachmentRoutes from './routes/attachment.routes';
import sessionRoutes from './routes/session.routes';

const app = express();

// ---------- Middlewares ----------
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(errorHandler);


// ---------- Mount routes ----------
app.use('/auth', authRoutes);                     // auth endpoints
app.use('/api/organizations', orgRoutes);         // organizations
app.use('/api/resources', resourceRoutes);        // resources
app.use('/api/bookings', bookingRoutes);          // bookings
app.use('/api/forum', forumRoutes);               // forum
app.use('/api/admin', adminRoutes);               // admin (fixed mount)

// newly added
app.use('/api/courses', courseRoutes);            // courses + roles
app.use('/api/notifications', notificationRoutes);// notifications
app.use('/api/attachments', attachmentRoutes);    // file uploads
app.use('/api/sessions', sessionRoutes);          // user sessions

// ---------- Start server ----------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
