const express = require("express");
const dotenv = require("dotenv");
const router = express.Router();
const verify = require("../../verifyToken");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");

dotenv.config();

const {
  statSkillValidation,
  expValidation,
  eduValidation,
} = require("../api/validation");
const request = require("request");

//Get current user profile
router.get("/me", verify, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
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
  await Post.deleteMany({ user: req.user.id });
  await Profile.findOneAndRemove({ user: req.user.id });
  await User.findOneAndRemove({ _id: req.user.id });
  res.send("User deleted");
});
//Exp create
router.put("/experience", verify, async (req, res) => {
  const { error } = expValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { title, company, location, from, to, current, description } = req.body;
  const newExp = { title, company, location, from, to, current, description };
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.experience.unshift(newExp);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(400).send("Server error");
  }
});
//Deleting specific experience
router.delete("/experience/:exp_id", verify, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });

    foundProfile.experience = foundProfile.experience.filter(
      (exp) => exp._id.toString() !== req.params.exp_id
    );

    await foundProfile.save();
    return res.json(foundProfile);
  } catch (err) {
    res.status(400).send("Server error");
  }
});
//Education create
router.put("/education", verify, async (req, res) => {
  const { error } = eduValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = req.body;
  const newEdu = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  };
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.education.unshift(newEdu);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(400).send("Server error");
  }
});
//Deleting specific education
router.delete("/education/:edu_id", verify, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });
    foundProfile.education = foundProfile.education.filter(
      (edu) => edu._id.toString() !== req.params.edu_id
    );
    await foundProfile.save();
    return res.json(foundProfile);
  } catch (err) {
    res.status(400).send("Server error");
  }
});
//Github repo
router.get("/github/:username", async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:as&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.SECRET_ID}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };
    request(options, (error, response, body) => {
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: "No Github profile found" });
      }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    res.status(400).send("No Github profile found");
  }
});

module.exports = router;
