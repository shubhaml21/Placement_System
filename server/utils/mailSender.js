const nodemailer = require("nodemailer");

// Configure transporter with environment variables
const mailSender = async (email, title, body) => {
  try {
    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT || 587, // Use port 587 for TLS/STARTTLS
      secure: process.env.MAIL_PORT === '465', // Use SSL if port is 465
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Email message options
    let mailOptions = {
      from: '"Ips Academy Placement Portal" <noreply@example.com>', 
      to: email,
      subject: title,
      html: body,
    };

    // Send mail and return information
    let info = await transporter.sendMail(mailOptions);

    // Log the success message
    console.log(`Email sent successfully to ${info.envelope.to.join(", ")}:`, info.messageId);

    return info;
  } catch (err) {
    console.error("Error sending email:", err);
    throw err; // Re-throw the error for handling by the caller
  }
};

module.exports = mailSender;
