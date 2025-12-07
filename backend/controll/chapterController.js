import Chapter from "../models/Chapter.js";
import Course from "../models/Course.js";

// --------------------- CREATE CHAPTER ---------------------
export const createChapter = async(req, res) => {
    try {
        const { courseId, title, description } = req.body;

        const course = await Course.findById(courseId)
            .populate("instructor", "_id name email");

        if (!course)
            return res.status(404).json({ message: "Course not found" });

        if (course.instructor._id.toString() !== req.user.id)
            return res.status(403).json({ message: "Forbidden" });

        const chapter = await Chapter.create({ courseId, title, description });

        course.chapters.push(chapter._id);
        await course.save();

        res.status(201).json(chapter);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// --------------------- UPDATE CHAPTER ---------------------
export const updateChapter = async(req, res) => {
    try {
        const chapter = await Chapter.findById(req.params.id).populate({
            path: "courseId",
            populate: { path: "instructor", select: "_id name email" }
        });

        if (!chapter) {
            return res.status(404).json({ message: "Chapter not found" });
        }

        if (!chapter.courseId || !chapter.courseId.instructor) {
            return res.status(400).json({ message: "Invalid course or instructor" });
        }

        if (chapter.courseId.instructor._id.toString() !== req.user.id) {
            return res.status(403).json({ message: "Forbidden" });
        }

        const {
            title,
            description,
            videoUrl,
            thumbnailUrl,
            pdfUrl,
            videoDuration
        } = req.body;

        if (title) chapter.title = title;
        if (description) chapter.description = description;
        if (videoUrl) chapter.videoUrl = videoUrl;
        if (thumbnailUrl) chapter.thumbnailUrl = thumbnailUrl;
        if (pdfUrl) chapter.pdfUrl = pdfUrl;
        if (videoDuration) chapter.videoDuration = videoDuration;

        await chapter.save();
        res.json(chapter);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// --------------------- DELETE CHAPTER ---------------------
export const deleteChapter = async(req, res) => {
    try {
        const chapter = await Chapter.findById(req.params.id)
            .populate({
                path: "courseId",
                populate: { path: "instructor", select: "_id name email" }
            });

        if (!chapter)
            return res.status(404).json({ message: "Chapter not found" });

        if (!chapter.courseId || !chapter.courseId.instructor) {
            return res.status(400).json({ message: "Invalid course or instructor" });
        }


        if (chapter.courseId.instructor._id.toString() !== req.user.id)
            return res.status(403).json({ message: "Forbidden" });

        await Course.findByIdAndUpdate(chapter.courseId._id, {
            $pull: { chapters: chapter._id },
        });

        await chapter.deleteOne();

        res.json({ message: "Chapter deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};