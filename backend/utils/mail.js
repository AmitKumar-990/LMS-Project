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




// import sgMail from "@sendgrid/mail";

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const sendEmail = async(email, subject, message) => {
//     const msg = {
//         to: email,
//         from: process.env.SENDGRID_SENDER,
//         subject,
//         html: message,
//     };

//     try {
//         await sgMail.send(msg);
//         console.log("📧 Email sent successfully");
//     } catch (err) {
//         console.error(
//             "SendGrid Error:",
//             (err.response && err.response.body) ? err.response.body : err.message
//         );
//     }
// };

// export default sendEmail;