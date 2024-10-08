const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserReg = require("../models/User");
const dotenv = require("dotenv").config();

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserReg({ name, email, password: hashedPassword });

    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.PASSWORD, {
      expiresIn: "24h",
    });

    res.json({
      token,
      message: "Registration successful",
      userData: { name, email, password, _id: user._id },
    });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await UserReg.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (password !== user.password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.PASSWORD, {
      expiresIn: "24h",
    });

    res.json({
      token: token,
      userData: user,
      message: "Sign-in is successful!",
    });
  } catch (error) {
    next(error);
  }
};
const updateUser = async (req, res, next) => {
  const { userId } = req.params;
  const { name, email, password } = req.body;

  try {
    const userData = await UserReg.findById(userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    if (name) {
      userData.name = name;
    }
    if (email) {
      userData.email = email;
    }
    if (password) {
      userData.password = password;
    }

    await userData.save();

    res.json({
      message: "User data updated successfully",
      userData: { name, email, password, _id: userId },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { register, login, updateUser };
