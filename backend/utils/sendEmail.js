import { Resend } from 'resend';

const sendEmail = async (options) => {
  // Use Resend if API key is provided (recommended for production on Render)
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: `${process.env.FROM_NAME || 'ShopNest'} <${process.env.FROM_EMAIL || 'onboarding@resend.dev'}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html || `<p>${options.message}</p>`,
    });

    if (error) {
      throw new Error(error.message);
    }

    console.log('Message sent via Resend:', data.id);
  } else {
    // Fallback: nodemailer for local development with a custom SMTP server
    const nodemailer = await import('nodemailer');
    const transporter = nodemailer.default.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: String(process.env.SMTP_PORT) === '465',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const message = {
      from: `${process.env.FROM_NAME || 'ShopNest'} <${process.env.FROM_EMAIL || 'noreply@shopnest.com'}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html || `<p>${options.message}</p>`,
    };

    const info = await transporter.sendMail(message);
    console.log('Message sent via SMTP:', info.messageId);
  }
};

export default sendEmail;
