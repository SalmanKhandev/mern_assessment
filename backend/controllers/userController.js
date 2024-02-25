const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    const checkDuplicate = await User.findOne({ email: req.body.email });
    if (checkDuplicate) {
      return res.json({
        success: false,
        message: "Email already exists",
        data: [],
      });
    }
    const user = new User(req.body);
    await user.save();
    res.json({
      success: true,
      message: "user created successfully",
      data: user,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");
    res.json({ success: true, message: "all users ", data: users });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send({ success: true, message: "user record", data: user });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const { name, email, addresses, role, phoneNo } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        addresses,
        role,
        phoneNo,
      },
      { new: true }
    ).select("-password");
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.role !== "admin") {
      return res.status(401).send("Unauthorized");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Unauthorized");
    }

    const token = jwt.sign({ userId: user._id }, "mern", {
      expiresIn: "1h",
    });
    let loginUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    };
    res.send({
      success: true,
      message: "you are logged in successfully",
      data: loginUser,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
