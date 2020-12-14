const Student = require("../models/student");

const createStudent = async (req, res) => {
  try {
    const student = new Student({ ...req.body, isVerified: false });
    const data = await student.save();
    res.status(200).json({ msg: `SUCCESS.`, data });
  } catch (err) {
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
  try {
    const students = await Student.find();
    res.status(200).json({ msg: `SUCCESS.`, students });
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

module.exports = { getStudents, createStudent, deleteStudent, updateStudent };
