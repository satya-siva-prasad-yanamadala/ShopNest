import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const test = async () => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to: process.env.SMTP_EMAIL, // sending to yourself
      subject: "Test Email from ShopNest",
      text: "If you receive this, the email configuration is working perfectly!",
    });

    console.log("Email sent successfully: " + info.messageId);
    process.exit();
  } catch (error) {
    console.error("Failed to send email:");
    console.error(error);
    process.exit(1);
  }
};

test();
