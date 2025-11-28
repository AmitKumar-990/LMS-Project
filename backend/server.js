import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/route.js';
import googleRoutes from './routes/googleroute.js';
import passport from 'passport';
import './config/googleConfig.js';
import courseRoutes from "./routes/courseRoutes.js";
import chapterRoutes from "./routes/chapterRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use('/api/auth', authRoutes);
app.use('/api', googleRoutes);

// 28/11/2025
app.use("/api/course", courseRoutes);
app.use("/api/chapter", chapterRoutes);
app.use("/api/content", contentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port', PORT));