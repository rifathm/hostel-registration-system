const Student = require("../models/student");
const multer = require("multer");
const express = require("Express");
const router = express.Router();
const { sendMail } = require("../services/mail");

// define storage for image
const storage = multer.diskStorage({
  // destination for files
  destination: function (req, file, callback) {
    callback(null, "../client/src/shared/Images");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

// upload parameter for upload
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 512 * 512 * 3,
  },
});

//upload with image try

router.post("/students", upload.single("img"), (req, res) => {
  User.findById(req.params.id)
    .then((student) => {
      student.img = req.file.originalname;

      user
        .save()
        .then(() => res.json("Succesfully updated User"))
        .catch((err) => res.status(400).json(`ERROR: ${err}`));
    })
    .catch((err) => res.status(400).json(`ERROR: ${err}`));
});

const createStudent = async (req, res) => {
  console.log(req.body);
  try {
    const student = new Student({ ...req.body, isVerified: false });
    const data = await student.save();
    res.status(200).json({ msg: `SUCCESS.`, data });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: `ERROR: ${err}` });
  }
};

const deleteStudent = async (req, res) => {
  try {
    console.log();
    const student = await Student.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: `Successfully deleted student`, student });
  } catch (err) {
    res.status(400).json({ msg: `ERROR: ${err}` });
  }
};

const getStudents = async (req, res) => {
  const { query } = req;
  console.log(query);
  try {
    let students = [];
    if (query) {
      students = await Student.find(query).catch((err) => console.log(err));
    } else {
      students = await Student.find();
    }
    res.status(200).json({ msg: `SUCCESS.`, students });
  } catch (err) {
    res.status(400).json({ msg: `ERROR: ${err}` });
  }
};

const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    res.status(200).json({ msg: `SUCCESS.`, student });
  } catch (err) {
    res.status(400).json({ msg: `ERROR: ${err}` });
  }
};

const updateStudent = async (req, res) => {
  try {
    const students = await Student.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );
    res.status(200).json({ msg: `Succesfully updated Student.`, students });
  } catch (err) {
    res.status(400).json({ msg: `ERROR: ${err}` });
  }
};

const patchStudent = async (req, res) => {
  console.log(req.body);
  try {
    const students = await Student.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    ).then((student) => {
      sendMail({
        to: "rifadhmuhammadh96@gmail.com",
        subject: "Your Application has approved",
        text: "bar",
        html: `<p>Dear ${student.surName},<br/><br/>
        <pre>This email is to confirm that your application for hostel has been approved.Further details are listed below.

       Selected Hostel:${student.selectedHostel}
        
        
        If you need to make any  changes or any inquiries , Contact us via our website[<a href="http://localhost:3000/contact"></a>].
        
        Thanks
        Welfare Society,
        University of Jaffna.</pre>`,
      });
    });
    res.status(200).json({ msg: `Succesfully updated Student.`, students });
  } catch (err) {
    res.status(400).json({ msg: `ERROR: ${err}` });
  }
};

module.exports = {
  getStudents,
  getStudent,
  createStudent,
  deleteStudent,
  updateStudent,
  patchStudent,
  upload,
};
