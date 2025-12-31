import nodemailer from "nodemailer";

const sendEmail = async (email, subject, message, actionUrl = null, actionText = "View Details") => {
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
    from: `"GetSkillz" <${process.env.EMAIL_USER}>`,
    to: email,
    subject,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${subject}</title>
</head>

<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;">
    <tr>
      <td align="center">

        <!-- Email Container -->
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#2563eb; padding:22px 30px; text-align:center;">
              <h1 style="margin:0; color:#ffffff; font-size:24px; letter-spacing:0.5px;">
                GetSkillz
              </h1>
              <p style="margin:6px 0 0; color:#dbeafe; font-size:14px;">
                Learn. Grow. Succeed.
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px; color:#333333;">
              <h2 style="margin-top:0; color:#111827; font-size:22px;">
                ${subject}
              </h2>

              <div style="font-size:16px; line-height:1.7; margin-top:15px;">
                ${message}
              </div>

              ${actionUrl
        ? `
                <!-- CTA Button -->
                <div style="margin-top:30px; text-align:center;">
                  <a href="${actionUrl}"
                     style="
                       display:inline-block;
                       padding:14px 26px;
                       background:#2563eb;
                       color:#ffffff;
                       font-size:16px;
                       text-decoration:none;
                       border-radius:8px;
                       font-weight:600;
                     ">
                    ${actionText}
                  </a>
                </div>
                `
        : ""
      }
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb; padding:22px 30px; text-align:center; border-top:1px solid #e5e7eb;">
              <p style="margin:0; font-size:14px; color:#6b7280;">
                Need help? Contact us at
                <a href="mailto:get.skillz.help@gmail.com" style="color:#2563eb; text-decoration:none;">
                  get.skillz.help@gmail.com
                </a>
              </p>

              <p style="margin:10px 0 0; font-size:12px; color:#9ca3af;">
                © ${new Date().getFullYear()} GetSkillz. All rights reserved.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
    `,
    replyTo: "get.skillz.help@gmail.com",
  });
};

export default sendEmail;
