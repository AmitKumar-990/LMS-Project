import Course from "../models/Course.js";
import Chapter from "../models/Chapter.js";
// import Content from "../models/Content.js";

export const createCourse = async(req, res) => {
    try {
        const { title, description, category, price, thumbnailUrl } = req.body;

        const course = await Course.create({
            title,
            description,
            category,
            price,
            thumbnailUrl,
            instructor: req.user.id,
        });

        res.status(201).json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getMyCourses = async(req, res) => {
    try {
        const courses = await Course.find({ instructor: req.user.id }).populate("chapters");
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getAllCourses = async(req, res) => {
    try {
        const courses = await Course.find().populate("instructor", "name email");
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getCoursesByInstructor = async(req, res) => {
    try {
        const instructorId = req.params.instructorId;
        const courses = await Course.find({ instructor: instructorId });

        res.json({ success: true, courses });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const getCourseById = async(req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate("instructor", "name email")
            .populate("chapters");

        if (!course) return res.status(404).json({ message: "Course not found" });

        res.json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateCourse = async(req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) return res.status(404).json({ message: "Course not found" });
        if (course.instructor.toString() !== req.user.id)
            return res.status(403).json({ message: "Forbidden" });

        const allowedFields = [
            "title",
            "description",
            "category",
            "price",
            "thumbnailUrl",
            "chapters",
            "promoUrl"
        ];

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) course[field] = req.body[field];
        });

        await course.save();

        const updated = await Course.findById(course._id).populate("chapters");
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteCourse = async(req, res) => {
    try {
        const { id } = req.params;

        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({ message: "Forbidden: Not your course" });
        }
        await Chapter.deleteMany({ courseId: id });
        await course.deleteOne();

        return res.json({ message: "Course deleted successfully" });
    } catch (err) {
        console.error("deleteCourse error:", err);
        return res.status(500).json({ message: err.message || "Server error" });
    }
};