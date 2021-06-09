const hbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");

require("dotenv").config();

let smtpTransport = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

smtpTransport.use(
  "compile",
  hbs({
    viewEngine: "express-handlebars",
    viewPath: "./views/",
  })
);

let mailOptions = {
  from: "hrsadm.jfn@gmail.com",
  to: "rifadhmuhammadh96@gmail.com , raeesmohammed356@gmail.com ",
  subject: " Your Registration form has been sent to approval",
  text: "received from raisha farwin aaapli",
  template: "mail",
};

smtpTransport.sendMail(mailOptions, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log("Success");
  }
});
