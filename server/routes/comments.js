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
      const comments = await Comment.find({
        post: postID, 
        replyingTo: { $exists: false 
      }}, "content hearts createdAt hasReplies discussion_id author post replyingTo").sort({ _id: -1 }).populate('author', '_id firstName lastName image').exec();

      if (comments.length === 0) res.status(404).send({ status: false, message: 'Comments not found' });
      else res.status(200).send(comments);
  } catch (error) {
    console.log(error);
  }
});



// get all replies 


router.get("/discussion/:discussionIDs", async (req, res) => {

  let discussionIDs = JSON.parse(req.params.discussionIDs);

  try {
    
    const allComments = await Comment.find({
      discussion_id: {
        $in: discussionIDs
      },
      replyingTo: {$exists: true}
    }, "content hearts createdAt discussion_id post" ).populate('author', 'firstName lastName image').populate('replyingToUser', '_id firstName lastName').exec();;
    
    console.log(allComments);
    
    if (allComments.length === 0) res.status(404).send({ status: false, message: 'replies not found' });
    else res.status(200).send(allComments);

  } catch (error) {
    console.log(error);
  }
});




// Post comment


router.post("/", checkLoggedIn, isLoggedIn, async (req, res) => {

  let {content, postTitle, discussion_id, replyingTo, replyingToUser} = req.body;
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
      new_comment.replyingToUser = replyingToUser;

      const parent = await Comment.findOne({ _id: replyingTo }, "hasReplies");

      if (!parent) res.status(404).send({ message: 'Parent comment not found' });

      else if (parent.hasReplies === false) {
        const updatedComment = await Comment.findByIdAndUpdate(replyingTo, { hasReplies: true });
        if (updatedComment) console.log('Changed boolean successfully, ', updatedComment);
      }
    }

    else {
      const new_discussion = new Discussion({});
      const discussion = await new_discussion.save();
      if (discussion) console.log('Added discussion successfully', discussion);
      new_comment.discussion_id = discussion._id;
      new_comment.hasReplies = false;
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