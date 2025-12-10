import cloudinary from "../utils/cloudinary.js";
import streamifier from "streamifier";
import fs from "fs";
import Content from "../models/Content.js";
import Chapter from "../models/Chapter.js";

export const uploadVideo = async(req, res) => {
    try {
        if (!req.file)
            return res.status(400).json({ message: "No file provided" });

        const streamUpload = () =>
            new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({
                        resource_type: "video",
                        folder: "lms/videos",
                        chunk_size: 6000000,
                        eager: [{
                            width: 600,
                            height: 338,
                            crop: "pad",
                            format: "jpg",
                        }, ],
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );

                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });

        const result = await streamUpload();

        res.json({
            url: result.secure_url,
            thumbnailUrl:
                (result.eager && result.eager[0] && result.eager[0].secure_url) || "",
            duration: result.duration || 0,
            public_id: result.public_id,
        });

    } catch (err) {
        console.error("Cloudinary Upload Error:", err);
        res.status(500).json({ message: err.message });
    }
};

export const uploadPDF = async(req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file provided" });

        const streamUpload = () =>
            new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({
                        resource_type: "raw",
                        folder: "lms/pdfs",
                        format: "pdf",
                        filename_override: req.file.originalname.replace(/\.[^/.]+$/, ""), // keep name without extension
                        public_id: req.file.originalname.replace(/\.[^/.]+$/, ""), // cloudinary stores with correct name
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );

                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });

        const result = await streamUpload();

        res.json({
            url: result.secure_url,
            public_id: result.public_id,
        });
    } catch (err) {
        console.error("PDF Upload Error:", err);
        res.status(500).json({ message: err.message });
    }
};

export const uploadThumbnail = async(req, res) => {
    try {
        if (!req.file)
            return res.status(400).json({ message: "No file provided" });

        const streamUpload = () =>
            new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({
                        folder: "lms/thumbnails",
                        resource_type: "image",
                        width: 800,
                        height: 450,
                        crop: "fill",
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );

                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });

        const result = await streamUpload();

        res.json({
            url: result.secure_url,
            public_id: result.public_id,
        });

    } catch (err) {
        console.error("Thumbnail Upload Error:", err);
        res.status(500).json({ message: err.message });
    }
};

export const createContent = async(req, res) => {
    try {
        const {
            chapterId,
            type,
            title,
            description,
            videoUrl,
            thumbnailUrl,
            pdfUrl,
            textData,
        } = req.body;

        const chapter = await Chapter.findById(chapterId).populate("course");
        if (!chapter) return res.status(404).json({ message: "Chapter not found" });

        if (chapter.course.instructor.toString() !== req.user.id)
            return res.status(403).json({ message: "Forbidden" });

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

export const deleteContent = async(req, res) => {
    try {
        const content = await Content.findById(req.params.id).populate({
            path: "chapter",
            populate: { path: "course" },
        });

        if (!content)
            return res.status(404).json({ message: "Content not found" });

        if (content.chapter.course.instructor.toString() !== req.user.id)
            return res.status(403).json({ message: "Forbidden" });

        await Content.findByIdAndDelete(req.params.id);

        await Chapter.findByIdAndUpdate(content.chapter._id, {
            $pull: { contents: content._id },
        });

        res.json({ message: "Content deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// res.json({
//     url: result.secure_url,
//     thumbnailUrl:
//         (result.eager && result.eager[0] && result.eager[0].secure_url) || "",
//     duration: result.duration || 0,
//     public_id: result.public_id,
// });