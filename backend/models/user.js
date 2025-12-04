// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     password: String,
//     role: {
//         type: String,
//         enum: ["student", "instructor", "admin"],
//         default: "student",
//     },
// }, { timestamps: true });

// export default mongoose.models.User || mongoose.model("User", userSchema);


import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        name: {
            type: String,
            trim: true,
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
        },

        role: {
            type: String,
            enum: ["student", "instructor", "admin"],
            default: "student",
        },

        resetToken: {
            type: String,
            default: null,
        },

        resetTokenExpiry: {
            type: Date,
            default: null,
        },
    },

    {
        timestamps: true,
    }
);

export default mongoose.models.User || mongoose.model("User", userSchema);