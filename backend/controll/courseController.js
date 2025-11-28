import Course from "../models/Course.js";

// Create course
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

// Get instructor courses
export const getMyCourses = async(req, res) => {
    try {
        const courses = await Course.find({ instructor: req.user.id }).populate("chapters");
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update course
export const updateCourse = async(req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: "Course not found" });
        if (course.instructor.toString() !== req.user.id) return res.status(403).json({ message: "Forbidden" });

        const fields = ["title", "description", "category", "price", "thumbnailUrl"];
        fields.forEach(f => { if (req.body[f] !== undefined) course[f] = req.body[f]; });

        await course.save();
        res.json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete course (and optionally cascade delete chapters/contents)
export const deleteCourse = async(req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: "Course not found" });
        if (course.instructor.toString() !== req.user.id) return res.status(403).json({ message: "Forbidden" });

        await course.remove();
        res.json({ message: "Course deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};