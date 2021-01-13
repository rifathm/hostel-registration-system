const { connections } = require("mongoose");
const User = require("../models/User");
const UserSession = require("../models/UserSession");

//create Users
const registerUser = async (req, res, next) => {
  const { body } = req;
  const { name, role, password } = body;
  let { email } = body;

  if (!name) {
    return res.send({
      success: false,
      message: "Error:Name cannot be empty",
    });
  }

  if (!role) {
    return res.send({
      success: false,
      message: "Error:Role cannot be empty",
    });
  }

  if (!email) {
    return res.send({
      success: false,
      message: "Error:Email cannot be empty",
    });
  }

  if (!password) {
    return res.send({
      success: false,
      message: "Error:Password cannot be empty",
    });
  }

  email = email.toLowerCase();

  User.find(
    {
      email: email,
    },
    (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error:Server Error",
        });
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: "Error:Account already exist",
        });
      }

      const newUser = new User();

      newUser.email = email;
      newUser.name = name;
      newUser.role = role;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error:Server Error",
          });
        }
        return res.send({
          success: true,
          message: "SignedUp",
        });
      });
    }
  );
};

//delete Users
const deleteUser = async (req, res) => {
  try {
    console.log();
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: `Successfully deleted User`, user });
  } catch (err) {
    res.status(400).json({ msg: `ERROR: ${err}` });
  }
};

// get users
const getUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json({ msg: `SUCCESS.`, user });
  } catch (err) {
    res.status(400).json({ msg: `ERROR: ${err}` });
  }
};

//Update User Info
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );
    res.status(200).json({ msg: `Succesfully updated User.`, user });
  } catch (err) {
    res.status(400).json({ msg: `ERROR: ${err}` });
  }
};

//User SignIn
const userSignIn = async (req, res, next) => {
  const { body } = req;
  const { password } = body;
  let { email } = body;

  if (!email) {
    return res.send({
      success: false,
      message: "Error:Email cannot be empty",
    });
  }

  if (!password) {
    return res.send({
      success: false,
      message: "Error:Password cannot be empty",
    });
  }

  email = email.toLowerCase();

  User.find(
    {
      email: email,
    },
    (err, users) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error:Server Error",
        });
      } else if (users.length != 1) {
        return res.send({
          success: false,
          message: "Error:Invalid Email",
        });
      }

      const user = users[0];
      if (!user.validPassword(password)) {
        return res.send({
          success: false,
          message: "Error:Invalid Password ",
        });
      }

      //userSesion
      const userSession = new UserSession();
      userSession.userId = user._id;
      userSession.save((err, doc) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error:Server Error",
          });
        }

        return res.send({
          success: true,
          message: "valid Sign in",
          token: doc._id,
        });
      });
    }
  );
};

//Verification
const verify = async (req, res, next) => {
  // get the token
  const { query } = req;
  const { token } = query;

  // ?token = test
  // verify the token and its not deleted

  UserSession.find(
    {
      _id: token,
    },
    (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error : Server Error",
        });
      }

      if (sessions.length != 1) {
        return res.send({
          success: false,
          message: "Invalid",
        });
      } else {
        return res.send({
          success: true,
          message: "Good",
        });
      }
    }
  );
};

//logout
const logout = async (req, res, next) => {
  // get the token
  const { query } = req;
  const { token } = query;

  // ?token = test
  // verify the token and its not deleted

  UserSession.findOneAndUpdate(
    {
      _id: token,
      isDeleted: false,
    },
    {
      $set: { isDeleted: true },
    },
    null,
    (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error : Server Error",
        });
      }

      return res.send({
        success: true,
        message: "Logged Out",
      });
    }
  );
};

module.exports = {
  getUsers,
  registerUser,
  deleteUser,
  updateUser,
  userSignIn,
  verify,
  logout,
};
