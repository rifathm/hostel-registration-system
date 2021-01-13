const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { check, validationResult } = require("express-validator");

//routes
const student = require("./routes/student");
const signin = require("./routes/signin");
const hostel = require("./routes/hostel");
const { populate } = require("./models/User");

dotenv.config();
const app = express();
app.use(express.json());
app.use("/", express.static("./client/build/"));

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server listening at ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/students", student);
app.use("/user", signin);
app.use("/hostel", hostel);
