import express from "express";
import passport from "passport";
import {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword,
} from "../controll/authcontrol.js";

const router = express.Router();

// Existing Auth Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
        // You can redirect to frontend dashboard here
        res.json({ message: "Google Login Successful", user: req.user });
    }
);

export default router;