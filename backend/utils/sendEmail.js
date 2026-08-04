import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  // If no real SMTP credentials are provided, use ethereal email for testing
  let transporter;
  if (process.env.SMTP_HOST && process.env.SMTP_PORT) {
    // Force IPv4 resolution manually to bypass any Node.js IPv6 quirks
    const dns = await import('dns');
    let hostIp = process.env.SMTP_HOST;
    try {
      const { address } = await dns.promises.lookup(process.env.SMTP_HOST, { family: 4 });
      hostIp = address;
    } catch (err) {
      console.warn('Manual DNS IPv4 lookup failed, falling back to hostname', err);
    }

    transporter = nodemailer.createTransport({
      host: hostIp,
      port: process.env.SMTP_PORT,
      secure: false, // Set to true if port is 465
      tls: {
        servername: process.env.SMTP_HOST // Required for TLS certificate validation when using an IP
      },
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  } else {
    // Generate test SMTP service account from ethereal.email
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  const message = {
    from: `${process.env.FROM_NAME || 'ShopNest'} <${process.env.FROM_EMAIL || 'noreply@shopnest.com'}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html, // Optional HTML version
  };

  const info = await transporter.sendMail(message);

  console.log('Message sent: %s', info.messageId);
  // Preview only available when sending through an Ethereal account
  if (!process.env.SMTP_HOST) {
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
};

export default sendEmail;
