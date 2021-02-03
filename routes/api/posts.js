const express = require("express");
const router = express.Router();
const { postValidation } = require("../api/validation");
const verify = require("../../verifyToken");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

//Post create
router.post("/", verify, async (req, res) => {
  const { error } = postValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const user = await User.findById(req.user.id).select("-password");
    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    });
    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    res.status(400).send("Server error");
  }
});
//Get post
router.get("/", verify, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    res.status(400).send("Server error");
  }
});
//Get post by ID
router.get("/:id", verify, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(400).send("Server error");
  }
});
//Delete post
router.delete("/:id", verify, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    await post.remove();

    res.json({ msg: "Post removed" });
  } catch (err) {
    res.status(400).send("Server error");
  }
});
//Like Post
router.put("/like/:id", verify, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //Check if post is already liked by this user
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json("Post alerady liked");
    }
    //Pushing in array user who liked
    post.likes.unshift({ user: req.user.id });
    //Save to database
    await post.save();
    res.json(post.likes);
  } catch (err) {
    res.status(400).send("Server error");
  }
});
//Unlike Post
router.put("/unlike/:id", verify, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Check if post is already liked by this user
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json("Post has not yet been liked");
    }

    //Remove the like
    post.likes = post.likes.filter(
      ({ user }) => user.toString() !== req.user.id
    );
    console.log(post.likes);
    //Save to database
    await post.save();
    res.json(post.likes);
  } catch (err) {
    res.status(400).send("Server error");
  }
});

//Create comment
router.post("/comment/:id", verify, async (req, res) => {
  const { error } = postValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const user = await User.findById(req.user.id).select("-password");
    const post = await Post.findById(req.params.id);
    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    };
    post.comments.unshift(newComment);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    res.status(400).send("Server error");
  }
});
//Delete comment
router.delete("/comment/:id/:comment_id", verify, async (req, res) => {
  try {
    //Post ID
    const post = await Post.findById(req.params.id);
    //Comment ID from post
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    if (!comment)
      return res.status(401).json({ mmsg: "Comment does not exist" });
    //Check if user made comment so it can delete it
    if (comment.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not authorized" });
    //remove index
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    res.status(400).send("Server error");
  }
});
module.exports = router;
