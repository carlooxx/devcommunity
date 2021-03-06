const express = require("express");
const router = express.Router();
const { registerValidation } = require("../api/validation");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const normalize = require("normalize-url");

//Importing Model
const User = require("../../models/User");
const { json } = require("express");
dotenv.config();
router.post("/", async (req, res) => {
  //Validation check
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    //User exist check
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("User already exist");

    //Avatar
    const avatar = normalize(
      gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm",
      }),
      { forceHttps: true }
    );

    //Password encrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      avatar,
      password: hashedPassword,
    });
    // JWT
    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
      expiresIn: 360000,
    });
    //Saving user
    await user.save();
    res.send({ token });

    // res.send(user);
  } catch (err) {
    res.status(400).send("Server error");
  }
});

module.exports = router;
