const nodemailer = require("nodemailer")

module.exports.sendMail = () => {
  const nodemailer = require("nodemailer");

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "maddison53@ethereal.email",
      pass: "jn7jnAPss4f63QBp6D",
    },
  });

  const mailOptions = {
    from: '',
    to: '',
    subject: 'Subject',
    text: ''
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {

    } else {

    }
  })
}