const Student = require("../models/student");
const multer = require("multer");

// define storage for image
const storage = multer.diskStorage({
  // destination for files
  destination: function (request, file, callback) {
    callback(null, "../src/shared/Images");
  },
  filename: function (request, file, callback) {
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

module.exports = {
  getStudents,
  getStudent,
  createStudent,
  deleteStudent,
  updateStudent,
  upload,
};
