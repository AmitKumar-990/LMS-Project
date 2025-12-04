import Review from "../models/Review.js";

export const addReview = async(req, res) => {
    const { courseId, rating, review } = req.body;
    const studentId = req.user.id;

    const newReview = await Review.create({ courseId, studentId, rating, review });
    res.json(newReview);
};

export const getCourseReviews = async(req, res) => {
    const reviews = await Review.find({ courseId: req.params.courseId }).populate("studentId", "name");
    res.json(reviews);
};