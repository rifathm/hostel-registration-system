const Inquery = require("../models/feedback");

const createInquery = async (req, res) => {
  try {
    const inquery = new Inquery({ ...req.body, isVerified: false });
    const data = await inquery.save();
    res.status(200).json({ msg: `SUCCESS.`, data });
  } catch (err) {
    res.status(400).json({ msg: `ERROR: ${err}` });
  }
};

const deleteInquery = async (req, res) => {
  try {
    console.log();
    const inquery = await Inquery.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: `Successfully deleted inquery`, inquery });
  } catch (err) {
    res.status(400).json({ msg: `ERROR: ${err}` });
  }
};

const getInquerys = async (req, res) => {
  try {
    const inquerys = await Inquery.find();
    res.status(200).json({ msg: `SUCCESS.`, inquerys });
  } catch (err) {
    res.status(400).json({ msg: `ERROR: ${err}` });
  }
};

const getInquery = async (req, res) => {
  try {
    const inquerys = await Inquery.findById(req.params.id);
    res.status(200).json({ msg: `SUCCESS.`, inquerys });
  } catch (err) {
    res.status(400).json({ msg: `ERROR: ${err}` });
    console.log(err);
  }
};

const updateInquery = async (req, res) => {
  try {
    const inquerys = await Inquery.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );
    res.status(200).json({ msg: `Succesfully updated inquery.`, inquerys });
  } catch (err) {
    res.status(400).json({ msg: `ERROR: ${err}` });
  }
};

module.exports = {
  getInquerys,
  getInquery,
  createInquery,
  deleteInquery,
  updateInquery,
};
