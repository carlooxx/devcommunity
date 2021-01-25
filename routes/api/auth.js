const express = require("express");
const router = express.Router();
const verify = require("../../verifyToken");
const User = require("../../models/User");
const { loginValidation } = require("../api/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
router.get("/", verify, async (req, res) => {
  //Returning user's data beside password
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(400).send("Server error");
  }
});
//Login user
router.post("/", async (req, res) => {
  //Validation check
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //User exist check
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid Credentials");

  //Password = Email check
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid Credentials");

  //JWT
  const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
    expiresIn: 360000,
  });
  res.header("auth-token", token);
  res.send("Loged in");
});

module.exports = router;
