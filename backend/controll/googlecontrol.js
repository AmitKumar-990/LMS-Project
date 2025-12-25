import jwt from "jsonwebtoken";

export const googleCallbackHandler = (req, res) => {
  const token = jwt.sign(
    {
      id: req.user._id,
      email: req.user.email,
      role: req.user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.redirect(
    `http://localhost:5173/google-success?token=${token}`
  );
};
