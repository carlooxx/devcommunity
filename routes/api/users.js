const express = require("express");
const router = express.Router();
const { registerValidation } = require("../api/validation");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

//Importing Model
const User = require("../../models/User");
const { json } = require("express");
dotenv.config();
router.post("/", async (req, res) => {
  //Validation check
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //User exist check
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("User already exist");

  //Avatar
  const avatar = gravatar.url(req.body.email, {
    s: "200",
    r: "pg",
    d: "mm",
  });

  //Password encrypt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    avatar,
    password: hashedPassword,
  });
  const payload = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(
    payload,
    process.env.TOKEN_SECRET,
    { expiresIn: "5 days" },
    (err, token) => {
      if (err) throw err;
      res.json({ token });
    }
  );
  //JWT
  // const token = jwt.sign(
  //   { user: { id: user.id } },
  //   process.env.TOKEN_SECRET,
  //   {
  //     expiresIn: 360000,
  //   },
  //   (token) => res.json({ token })
  // );
  res.header("auth-token", token);

  //Saving user
  try {
    const savedUser = await user.save();
    // res.send(savedUser);
  } catch (err) {
    res.status(400).send("Server error");
  }
});

module.exports = router;
