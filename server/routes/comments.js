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
  console.log('skrrrrrrrrrrrrrrr');
  console.log('skrrrrrrrrrrrrrrr');
  console.log('skrrrrrrrrrrrrrrr');
  console.log(discussionIDs);
  console.log('skrrrrrrrrrrrrrrr');
  console.log('skrrrrrrrrrrrrrrr');
  console.log('skrrrrrrrrrrrrrrr');

  try {
    
    const allComments = await Comment.find({
      discussion_id: {
        $in: discussionIDs
      },
      replyingTo: {$exists: true}
    }, "content hearts createdAt discussion_id post" ).populate('author', 'firstName lastName image').populate('replyingToUser', '_id firstName lastName').exec();
    
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

      if (!parent) res.status(404).send({ message: 'Something went wrong' });

      else if (parent.hasReplies === false) {
        const updatedComment = await Comment.findByIdAndUpdate(replyingTo, { hasReplies: true });
        if (updatedComment) console.log('Changed hasReplies successfully');
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



// Delete comment


router.delete('/:comment', checkLoggedIn, isLoggedIn, async (req, res) => {
  try {
    console.log('SKRRRRRRRRRRR');
    console.log('SKRRRRRRRRRRR');
    console.log('SKRRRRRRRRRRR');
    console.log(req.params.comment);
    console.log('SKRRRRRRRRRRR');
    console.log(req.body.comment);
    console.log('SKRRRRRRRRRRR');
    console.log('SKRRRRRRRRRRR');
    console.log('SKRRRRRRRRRRR');
    const comment = req.body.comment;
    const commentID = req.body.comment._id;
    const discussionID = req.body.comment.discussion_id;


    const allComments = await Comment.find({ discussion_id: discussionID }, "_id discussion_id" );
    if (!allComments) res.status(404).send( {message: 'Comment could not be deleted'} );

    console.log('LAAAAAAAAAAAAAAAAAAAAA');
    console.log('LAAAAAAAAAAAAAAAAAAAAA');
    console.log(allComments);
    console.log('LAAAAAAAAAAAAAAAAAAAAA');
    console.log('LAAAAAAAAAAAAAAAAAAAAA');
    console.log(comment.hasReplies);
    console.log('----------------------');
    console.log('----------------------');


    // FIND COMMENT IDS

    // if (allComments.length < 2) {
    //   const comment = await Comment.findByIdAndDelete(commentID);
    //   if (!comment) res.status(404).send( {message: 'Comment could not be deleted'} );
    //   const discussion = await Discussion.findByIdAndDelete(discussionID);
    //   if (!discussion) res.status(404).send( {message: 'Comment thread could not be deleted'} );
    // } else if (comment.hasReplies === true) {
    //   console.log('Looopin');
      
    //   const commentsDeleted = await Comment.deleteMany({
    //     discussion_id: {
    //       $in: allComments
    //     }
    //   });

    // } else {
    //   const commentDeleted = await Comment.findByIdAndDelete(commentID);
    //   if (!commentDeleted) res.status(404).send( {message: 'Comment could not be deleted'} );
    // }

    // res.status(200).send( {message: 'Comment deleted'} );
    console.log('LAAAAAAAAAAAAAAAAAAAAA');
    console.log('LAAAAAAAAAAAAAAAAAAAAA');

    // const comment = await Comment.findByIdAndDelete(req.params.comment._id);
    // if (!comment) res.status(404).send({ message: 'Comment does not exist' });
    // else res.status(200).send({ message: 'Comment deleted' });

  } catch (error) {
    console.log(error);
  }
});

// router.delete('/:id', checkLoggedIn, isLoggedIn, async (req, res) => {
//   try {
//     deleteImage(req.params.id, 'post');
//     const post = await Post.findByIdAndDelete(req.params.id);
//     if (!post) res.status(404).send({ success: false, message: 'Could not find post' }); 
//     else res.status(200).send({ success: true, message: 'Post deleted successfully' });

//   } catch (error) {
//     console.log(error);
//     return res.status(404).send({ success: false, message: 'Post could not be deleted' });
//     // throw(error);
//   }
// });


module.exports = router;