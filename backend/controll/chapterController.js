import Chapter from "../models/Chapter.js";
import Course from "../models/Course.js";

export const createChapter = async(req, res) => {
    try {
        const { courseId, title, description } = req.body;
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });
        if (course.instructor.toString() !== req.user.id) return res.status(403).json({ message: "Forbidden" });

        const chapter = await Chapter.create({ course: courseId, title, description });
        course.chapters.push(chapter._id);
        await course.save();

        res.status(201).json(chapter);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Edit chapter
export const updateChapter = async(req, res) => {
    try {
        const chapter = await Chapter.findById(req.params.id).populate("course");
        if (!chapter) return res.status(404).json({ message: "Chapter not found" });
        if (chapter.course.instructor.toString() !== req.user.id) return res.status(403).json({ message: "Forbidden" });

        const { title, description } = req.body;
        if (title) chapter.title = title;
        if (description) chapter.description = description;
        await chapter.save();
        res.json(chapter);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete chapter
export const deleteChapter = async(req, res) => {
    try {
        const chapter = await Chapter.findById(req.params.id).populate("course");
        if (!chapter) return res.status(404).json({ message: "Chapter not found" });
        if (chapter.course.instructor.toString() !== req.user.id) return res.status(403).json({ message: "Forbidden" });

        // remove reference from course
        await Course.findByIdAndUpdate(chapter.course._id, { $pull: { chapters: chapter._id } });
        await chapter.remove();
        res.json({ message: "Chapter deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};