const nodemailer = require("nodemailer");
async function sendEmail({ email, otp }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD,
    },
  });
  const info = await transporter.sendMail({
    from: process.env.AUTH_EMAIL, // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Please Varify your Email", // plain text body
    html: `<div>
        <img
          src="https://i.ibb.co.com/NnfLmwvp/elegant-letter-k-graceful-royal-style-calligraphic-beautiful-logo-vintage-drawn-emblem-book-design-b.webp"
          alt="" 
        />
        <h4>you otp code is ${otp}</h4>
      </div>`,
  });
}
module.exports = sendEmail;
