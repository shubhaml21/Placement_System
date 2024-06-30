const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT || 587, // Add port if needed
      secure: false, // Use true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let mailOptions = {
      from: '"Ips Academy Placement Portal" <Vivekpatidar0190@gmail.com>',
      to: email,
      subject: title,
      html: body,
    };

    let info = await transporter.sendMail(mailOptions);

    // Logging the actual recipient from the envelope
    console.log(`Email sent successfully to ${info.envelope.to.join(", ")}:`, info.messageId);

    return info;
  } catch (err) {
    console.error("Error sending email:", err);
    throw err; // Throw the error for handling in the caller function
  }
};

module.exports = mailSender;
