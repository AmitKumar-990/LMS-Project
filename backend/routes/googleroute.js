import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
// import { googleCallbackHandler } from '../controll/googleControl.js';


const router = express.Router();

router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

router.get(
    "/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: "/" }),
    (req, res) => {
        const token = jwt.sign({ id: req.user._id, email: req.user.email, role: req.user.role },
            process.env.JWT_SECRET, { expiresIn: "7d" }
        );

        // Redirect back to frontend with token
        res.redirect(`${process.env.CLIENT_URL}/google-success?token=${token}`);
    }
);

export default router;