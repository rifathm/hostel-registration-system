const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");
const { getMaxListeners } = require("process");

const app = express();

// // view engine setup
// app.engine("handlebars", exphbs());
// app.set("view engine", "handlebars");

// //static folder
// app.use("/", express.static(path.join(__dirname, "")));

// //body parser middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.send("hello");
// });

// app.listen(3000, () => console.log("server started in port ...."));

var transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hrsadm.jfn@gmail.com",
    pass: "asdf1234@",
  },
});

//send ourt email

var mailOptions = {
  from: "hrsadm.jfn@gmail.com",
  to: "rifadhmuhammadh96@gmail.com",
  subject: " Your Registration form has been sent to approval",
  text: "Your application for hostel registration form sent to dean for recommendation",
};

transport.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent " + info.reponse);
  }
});
