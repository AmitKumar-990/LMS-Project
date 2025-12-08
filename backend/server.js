import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import connectDB from "./config/db.js";
import path from "path";

import authRoutes from "./routes/route.js";
import googleRoutes from "./routes/googleroute.js";
import passport from "passport";
import "./config/googleConfig.js";
import courseRoutes from "./routes/courseRoutes.js";
import chapterRoutes from "./routes/chapterRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import paymentRoutes from "./routes/paymentRoute.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import { clearScreenDown } from "readline";

connectDB();

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json({ limit: "1gb" }));
app.use(express.urlencoded({ limit: "1gb", extended: true }));

app.use(passport.initialize());
app.use("/uploads", express.static("uploads"));
clearScreenDown
app.use("/api/auth", authRoutes);
app.use("/api", googleRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/chapter", chapterRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/enrollments", enrollmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));