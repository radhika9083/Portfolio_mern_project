// controllers/portfolioController.js
const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
  try {
    const { name, email, msg } = req.body;

    if (!name || !email || !msg) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Transporter setup (for Gmail, or replace with your SMTP settings)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,      // your email address
        pass: process.env.MAIL_PASS       // app password or actual password (use .env for security)
      }
    });

    const mailOptions = {
      from: email,
      to: process.env.MAIL_RECEIVER,      // your personal email to receive messages
      subject: `Portfolio Message from ${name}`,
      html: `
        <h3>Contact Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${msg}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Message sent successfully! I will reach out to you soon."
    });

  } catch (error) {
    console.error("Error sending email", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send email. Please try again later."
    });
  }
};

module.exports = { sendEmail };
