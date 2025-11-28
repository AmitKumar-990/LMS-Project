import Content from "../models/Content.js";
import Chapter from "../models/Chapter.js";
import cloudinary from "../utils/cloudinary.js";

// Create a content record (video/pdf/text) WITHOUT files (file URLs provided)
export const createContent = async(req, res) => {
    try {
        const { chapterId, type, title, description, videoUrl, thumbnailUrl, pdfUrl, textData } = req.body;
        const chapter = await Chapter.findById(chapterId).populate("course");
        if (!chapter) return res.status(404).json({ message: "Chapter not found" });
        if (chapter.course.instructor.toString() !== req.user.id) return res.status(403).json({ message: "Forbidden" });

        const content = await Content.create({
            chapter: chapterId,
            type,
            title,
            description,
            videoUrl,
            thumbnailUrl,
            pdfUrl,
            textData,
        });

        chapter.contents.push(content._id);
        await chapter.save();

        res.status(201).json(content);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Upload video file (multer memory file) -> Cloudinary (resource_type: 'video')
export const uploadVideo = async(req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });

        const buffer = req.file.buffer;

        const streamUpload = (buffer) =>
            new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({ resource_type: "video", folder: "lms_videos" },
                    (error, result) => {
                        if (result) resolve(result);
                        else reject(error);
                    }
                );
                stream.end(buffer);
            });

        const result = await streamUpload(buffer);
        res.json({ url: result.secure_url, public_id: result.public_id, raw: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Upload image/thumbnail (resource_type 'image' or 'auto')
export const uploadThumbnail = async(req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });

        const buffer = req.file.buffer;

        const streamUpload = (buffer) =>
            new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({ resource_type: "image", folder: "lms_thumbnails" },
                    (error, result) => {
                        if (result) resolve(result);
                        else reject(error);
                    }
                );
                stream.end(buffer);
            });

        const result = await streamUpload(buffer);
        res.json({ url: result.secure_url, public_id: result.public_id, raw: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete content
export const deleteContent = async(req, res) => {
    try {
        const content = await Content.findById(req.params.id).populate({ path: "chapter", populate: { path: "course" } });
        if (!content) return res.status(404).json({ message: "Content not found" });
        if (content.chapter.course.instructor.toString() !== req.user.id) return res.status(403).json({ message: "Forbidden" });

        // Optionally remove files from Cloudinary using public_id if stored (you can store public_id in Content model)
        await Content.findByIdAndRemove(req.params.id);
        await Chapter.findByIdAndUpdate(content.chapter._id, { $pull: { contents: content._id } });

        res.json({ message: "Content deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};