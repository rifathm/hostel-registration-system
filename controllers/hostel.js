const Hostel = require("../models/hostels");

const createHostel = async (req, res) => {
  try {
    const hostel = new Hostel({ ...req.body, isVerified: false });
    const data = await hostel.save();
    res.status(200).json({ msg: `SUCCESS.`, data });
  } catch (err) {
    res.status(400).json({ msg: `ERROR: ${err}` });
  }
};

const deleteHostel = async (req, res) => {
  try {
    console.log();
    const hostel = await Hostel.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: `Successfully deleted hostel`, hostel });
  } catch (err) {
    res.status(400).json({ msg: `ERROR: ${err}` });
  }
};

const getHostels = async (req, res) => {
  try {
    const hostels = await Hostel.find();
    res.status(200).json({ msg: `SUCCESS.`, hostels });
  } catch (err) {
    res.status(400).json({ msg: `ERROR: ${err}` });
  }
};

const updateHostel = async (req, res) => {
  try {
    const hostels = await Hostel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );
    res.status(200).json({ msg: `Succesfully updated hostel.`, hostels });
  } catch (err) {
    res.status(400).json({ msg: `ERROR: ${err}` });
  }
};

module.exports = {
  getHostels,
  createHostel,
  deleteHostel,
  updateHostel,
};
