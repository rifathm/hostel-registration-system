const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { check, validationResult } = require("express-validator");
const path = require("path");
const cors = require("cors");

//routes
const student = require("./routes/student");
const user = require("./routes/user");
const hostel = require("./routes/hostel");
const { populate } = require("./models/User");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MongoDb connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/students", student);
app.use("/user", user);
app.use("/hostels", hostel);

if (process.env.ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`Server listening at ${PORT}`));
