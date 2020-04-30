const express = require("express");
const router = express.Router();
const { checkLoggedIn, isLoggedIn } = require('../middleware');
const {verifyToken} = require('../helpers/helpers.js');
// const { validateComment } = require('../helpers/validation.js');
const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const Discussion = require("../models/discussion");



// Get comments for a post


router.get("/:postID", async (req, res) => {
    const postID = req.params.postID;

    try {
      const comments = await Comment.find({ post: postID, replyingTo: { $exists: false }}, "content hearts createdAt discussion_id author post replyingTo").sort({ _id: -1 }).populate('author', 'firstName lastName').exec();
      if (comments.length === 0) res.status(404).send({ status: false, message: 'Comments not found' });
      else res.status(200).send(comments);
  } catch (error) {
    console.log(error);
  }
});



// Get child comments for a discussion/comment thread 


// router.get("/discussion/:discussionID", async (req, res) => {

//   console.log('REPLY THREAD');
//   console.log('REPLY THREAD');
//   console.log('REPLY THREAD');
//   console.log('REPLY THREAD');
//   const discussion_id = req.params.discussionID;
//   console.log(discussion_id);
//   try {

//     const comments = await Comment.find({discussion_id: discussion_id, replyingTo: { $exists: true }}, "content hearts createdAt discussion_id author post").sort({ _id: -1 }).populate('author', 'firstName lastName').exec();
//     if (comments.length === 0) res.status(404).send({ status: false, message: 'Comments not found' });
//     else res.status(200).send(comments);

//   } catch (error) {
//     console.log(error);
//   }

// });



// get all replies 


router.get("/discussion/:discussionIDs", async (req, res) => {
  console.log('REPLY THREAD');
  console.log('REPLY THREAD');
  console.log('REPLY THREAD');
  console.log('REPLY THREAD');
  let discussionIDs = req.params.discussionIDs;
  console.log(discussionIDs);
  try {

    // const comments = await Comment.find({discussion_id: discussion_id, replyingTo: { $exists: true }}, "content hearts createdAt discussion_id author post").sort({ _id: -1 }).populate('author', 'firstName lastName').exec();
    
    const allComments = await Comment.find({
      discussion_id: {
        $in: discussionIDs
      },
      replyingTo: {$exists: true}
    });
    
    console.log(allComments);
    
    if (allComments.length === 0) res.status(404).send({ status: false, message: 'Comments not found' });
    else res.status(200).send(allComments);

  } catch (error) {
    console.log(error);
  }

  // const discussion_id = req.params.discussionIDs;
  // console.log(...discussionIDs);
});




// Post comment


router.post("/", checkLoggedIn, isLoggedIn, async (req, res) => {

  console.log(`................ NEW COMMENT`);
  console.log(`................ NEW COMMENT`);
  console.log(`................ NEW COMMENT`);
  let {content, postTitle, discussion_id, replyingTo} = req.body;
  const author = verifyToken(req).userID;

  try {
    const post = await Post.findOne({ title: postTitle }, "_id");
    if (!post) res.status(404).send({ success: false, message: 'Post not found' });

    const new_comment = new Comment({
      content,
      author,
      post: post._id
    });

    if (discussion_id) {
      new_comment.discussion_id = discussion_id;
      new_comment.replyingTo = replyingTo;
      console.log(new_comment.discussion_id);
      console.log(`................ NEW reply`);
      console.log(`${new_comment.replyingTo} REPLYING TO`);
      console.log(`................ NEW reply`);
}
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