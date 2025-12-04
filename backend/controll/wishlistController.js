import Wishlist from "../models/Wishlist.js";

export const toggleWishlist = async(req, res) => {
    const { courseId } = req.body;
    const studentId = req.user.id;

    const exists = await Wishlist.findOne({ studentId, courseId });

    if (exists) {
        await Wishlist.deleteOne({ _id: exists._id });
        return res.json({ saved: false });
    }

    await Wishlist.create({ studentId, courseId });
    res.json({ saved: true });
};

export const getWishlist = async(req, res) => {
    const studentId = req.user.id;
    const items = await Wishlist.find({ studentId }).populate("courseId");
    res.json(items);
};