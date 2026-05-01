import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ verify connection
    await transporter.verify();
    console.log("SMTP connected ✅");

    const info = await transporter.sendMail({
      from: `"HRMS App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });

    console.log("Email sent:", info.messageId);

  } catch (error) {
    console.log("EMAIL SEND ERROR ❌:", error);
    throw error;
  }
};

export default sendEmail;