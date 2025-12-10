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
        from: {
            name: "GetSkillz Support",
            address: process.env.EMAIL_USER
        },
        to: email,
        subject,
        html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background: #f7f8fa;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 25px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <h2 style="color:#2c3e50; text-align:center; margin-bottom: 20px;">
          ${subject}
        </h2>

        <!-- Main message -->
        <div style="color:#333; font-size: 16px; line-height: 1.6;">
          ${message}
        </div>

        <!-- Divider -->
        <hr style="margin: 30px 0; border: none; height: 1px; background: #eee;" />

        <!-- Footer -->
        <p style="font-size: 14px; color: #777; text-align:center;">
          Regards,<br/>
          <strong>GetSkillz Support Team</strong><br/>
          <a href="mailto:get.skillz.help@gmail.com" style="color:#3498db;">get.skillz.help@gmail.com</a>
        </p>

      </div>
    </div>
  `,
        replyTo: "get.skillz.help@gmail.com",
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