const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const NODE_ENV = process.env.NODE_ENV;

const SMTP_HOST = process.env.SMTP_HOST || "welfare.univ.jfn.ac.lk";
const SMTP_EMAIL = process.env.SMTP_EMAIL || "hrsadm.jfn@gmail.com";
const SMTP_PASSWORD = process.env.SMTP_PASSWORD || "asdf1234@";
const SMTP_PORT = process.env.SMTP_PORT || 587;

module.exports.sendMail = ({ to, from, subject, text, html }) => {
  let transporterOptions = {
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  };

  if (NODE_ENV === "production") {
    transporterOptions = {
      host: SMTP_HOST,
      port: SMTP_PORT,
      auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD,
      },
    };
  }

  const transporter = nodemailer.createTransport(transporterOptions);

  const mailOptions = {
    from: from || SMTP_EMAIL,
    to,
    subject,
    text,
    html: html || `<pre style="background: gray">HTML</pre>`,
  };

  transporter.sendMail(mailOptions, (err) =>
    err ? console.log(err) : console.log(`Mail sent to ${mailOptions.to}`)
  );
  console.log("success!!");
};
