const express = require("express");
const UserReg = require("../models/User");
const { authenticate } = require("../middlewares/auth");
const { register, login } = require("../controllers/auth");

const usersRouter = express.Router();

function isLoggedIn(req, res, next) {
  if (!(req.session && req.session.user)) {
    return res.send("Not logged in!");
  }
  next();
}

usersRouter.get("/profile", authenticate, (req, res) => {
  const userData = req.userData;
  res.json({ message: `Welcome ${userData.name}`, userData });
});

usersRouter.post("/sign-up", register);

usersRouter.post("/sign-in", login);

module.exports = usersRouter;
