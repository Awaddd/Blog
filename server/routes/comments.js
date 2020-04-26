const express = require("express");
const router = express.Router();
const { checkLoggedIn, isLoggedIn } = require('../middleware');
const {verifyToken} = require('../helpers/helpers.js');
// const { validateComment } = require('../helpers/validation.js');
const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const Discussion = require("../models/discussion");


router.get("/", async (req, res) => {
  try {
    const comments = await Comment.findOne({}, "content hearts discussion_id author post").sort({ _id: -1 });
    if (!comments) res.status(404).send({ status: false, message: 'Comments not found' });
    else res.status(200).send({comments: comments});
  } catch (error) {
    console.log(error);
  }
});


router.get("/:postID/comments", async (req, res) => {
  try {
    const postID = req.params.id;
    const comments = await Comment.find({}, "content hearts discussion_id author post").sort({ _id: -1 });
    if (!comments) res.status(404).send({ status: false, message: 'Comments not found' });
    else res.status(200).send({comments: comments});
  } catch (error) {
    console.log(error);
  }
});



// Post comment


router.post("/", async (req, res) => {

  let {content, postTitle, discussion_id} = req.body;
  const author = verifyToken(req).userID;

  try {
    const post = await Post.findOne({ title: postTitle }, "_id");
    if (!post) res.status(404).send({ success: false, message: 'Post not found' });

    const new_comment = new Comment({
      content,
      author,
      post: post._id,
    });

    if (discussion_id) new_comment.discussion_id = discussion_id;
    else {
      const new_discussion = new Discussion({});
      const discussion = await new_discussion.save();
      if (discussion) console.log('Added discussion successfully', discussion);
      new_comment.discussion_id = discussion._id;
    };

    console.log(new_comment);

    const comment = await new_comment.save();
    if (!comment) res.status(404).send({ success: false, message: 'Comment could not be added' });
    else res.status(200).send({ success: true, message: 'Comment added' });

  } catch (error) {
    console.log(error);
  }
});


// like comment


module.exports = router;