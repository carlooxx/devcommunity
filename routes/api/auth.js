const express = require("express");
const router = express.Router();
const verify = require("../../verifyToken");
const User = require("../../models/User");

router.get("/", verify, async (req, res) => {
  //Returning user's data beside password
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(400).send("Server error");
  }
});

module.exports = router;
