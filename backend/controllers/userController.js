import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generatToken.js";

// @desc Auth user/set token
// route POST /api/users/auth
// @access public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.find({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401); //.json({ message: "Register user" });
    throw new Error("Invalid User credentials");
  }
});

// @desc Auth user/set token
// route POST /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });

  if (user) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401); //.json({ message: "Register user" });
    throw new Error("Invalid User data");
  }
});

// @desc Auth user/set token
// route POST /api/users
// @access public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "user logged out" });
});

// @descget user profile
// route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "get user profile" });
});

// @desc update user profile
// route Put /api/users/profile
// @access Private
const updateUserprofile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "update user profile" });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserprofile,
};
