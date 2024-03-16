const express = require("express");
const nodemailer = require("nodemailer");

const mail = express();
mail.use(express.json());

mail.post("/send", (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let message = req.body.message;
    let transporter = nodemailer.createTransport({
        host: "smtpout.secureserver.net",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "mthobisi@mmz-media.com", // generated ethereal user
          pass: process.env.EMAIL_PASSWORD, // generated ethereal password
        },
      });
      let html = `${message}`;
      // send mail with defined transport object
      let info = transporter.sendMail({
        from: `${name} ${email}`, // sender address
        to: `mthobisi@mmmagubane.co.za`, // list of receivers
        subject: "Website Inquiry", // Subject line
        html: html, // html body
      });
      res.send(true)
  });

  module.exports = mail;