const express = require("express");
const router = express.Router();
const verify = require("../../verifyToken");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const { statSkillValidation } = require("../api/validation");

//Get current user profile
router.get("/me", verify, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.body.id,
    }).populate("user", ["name", "avatar"]);
    if (!profile)
      return res.status(400).send("There is no profile for this user");
    res.json(profile);
  } catch (err) {
    res.status(400).send("Server error");
  }
});

//Create or update user profile
router.post("/", verify, async (req, res) => {
  //Validation check
  const { error } = statSkillValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const profileFields = {};

  profileFields.user = req.user.id;
  skills = req.body.skills;
  const standardFields = [
    "handle",
    "company",
    "location",
    "bio",
    "status",
    "githubusername",
  ];
  const socialFields = [
    "youtube",
    "twitter",
    "facebook",
    "linkedin",
    "instagram",
  ];
  standardFields.forEach((field) => {
    if (req.body[field]) profileFields[field] = req.body[field];
  });
  profileFields.social = {};
  socialFields.forEach((field) => {
    if (req.body[field]) profileFields.social[field] = req.body[field];
  });
  if (skills) {
    profileFields.skills = skills.split(",").map((skill) => skill.trim());
  }

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      //Update Profile
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }
    //Create profile
    profile = new Profile(profileFields);
    await profile.save();
    res.send(profile);
  } catch (err) {
    res.status(400).send("Server error");
  }
});
//Get all profiles
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    res.status(400).send("Server error");
  }
});
//Get profile by user ID not profile ID
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) return res.status(400).send("Profile not found");
    res.json(profile);
  } catch (err) {
    res.status(400).send("Server error");
  }
});
//Delete profile and user
router.delete("/", verify, async (req, res) => {
  await Profile.findOneAndRemove({ user: req.user.id });
  await User.findOneAndRemove({ _id: req.user.id });
  res.send("User deleted");
});
module.exports = router;
