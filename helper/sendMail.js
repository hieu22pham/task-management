const nodemailer = require("nodemailer")

module.exports.sendMail = (email, subject, html) => {
  const nodemailer = require("nodemailer");

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'phammhieu2211@gmail.com',
    to: 'email',
    subject: subject,
    html: html
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {

    } else {

    }
  })
}