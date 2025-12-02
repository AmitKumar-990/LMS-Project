import nodemailer from "nodemailer";

const sendEmail = async(email, subject, message) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: `"GetSkillz Support" <${process.env.EMAIL_USER}>`,
        to: email,
        subject,
        html: message,
    });
};

export default sendEmail;