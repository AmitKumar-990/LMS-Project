import jwt from 'jsonwebtoken';

export const googleCallbackHandler = (req, res) => {
    const token = jwt.sign({ id: req.user._id, email: req.user.email, role: req.user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.redirect(`${process.env.CLIENT_URL}/google-success?token=${token}`);
};