import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import Payment from "../models/Payment.js";
import mongoose from "mongoose";

const last7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        days.push(d);
    }
    return days;
};

export const getInstructorStats = async(req, res) => {
    try {
        const instructorId = req.user.id;

        const totalCourses = await Course.countDocuments({ instructor: instructorId });

        const courses = await Course.find({ instructor: instructorId });
        const courseIds = courses.map(c => c._id);

        const totalEnrollments = await Enrollment.countDocuments({
            courseId: { $in: courseIds }
        });

        const totalEarningsAgg = await Payment.aggregate([
            { $match: { instructorId: new mongoose.Types.ObjectId(instructorId) } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        const totalEarnings = totalEarningsAgg[0] ?
            totalEarningsAgg[0].total :
            0;


        const days = last7Days();
        const studentsLast7 = await Promise.all(
            days.map(async d => {
                const next = new Date(d);
                next.setDate(d.getDate() + 1);

                const count = await Enrollment.countDocuments({
                    courseId: { $in: courseIds },
                    createdAt: { $gte: d, $lt: next }
                });

                return {
                    day: d.toLocaleDateString("en-US", { weekday: "short" }),
                    students: count
                };
            })
        );

        const earningsLast7 = await Promise.all(
            days.map(async d => {
                const next = new Date(d);
                next.setDate(d.getDate() + 1);

                const payments = await Payment.aggregate([{
                        $match: {
                            instructorId: new mongoose.Types.ObjectId(instructorId),
                            createdAt: { $gte: d, $lt: next }
                        }
                    },
                    {
                        $group: { _id: null, total: { $sum: "$amount" } }
                    }
                ]);

                return {
                    day: d.toLocaleDateString("en-US", { weekday: "short" }),
                    earning: payments[0] ? payments[0].total : 0
                };

            })
        );

        const courseComparison = await Promise.all(
            courses.map(async(course) => {
                const students = await Enrollment.countDocuments({ courseId: course._id });

                const earningsAgg = await Payment.aggregate([
                    { $match: { courseId: course._id } },
                    { $group: { _id: null, total: { $sum: "$amount" } } }
                ]);

                return {
                    course: course.title,
                    students,
                    earning: earningsAgg[0] ? earningsAgg[0].total : 0
                };
            })
        );

        res.json({
            totalCourses,
            totalEnrollments,
            totalEarnings,
            studentsLast7,
            earningsLast7,
            courseComparison
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};