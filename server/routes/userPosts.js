
const express = require("express");
const router = express.Router();
const { verifyToken } = require('../helpers/helpers.js');
const Post = require("../models/post");


// Get posts for one user


router.get("/:id/posts", async (req, res) => {
  try {
    const userID = verifyToken(req).userID;
    const posts = await Post.find({ author: userID }, "id title summary content image author createdAt category featured").populate('category', 'title').exec();
    if (posts.length < 1) res.status(404).send({success: false, message: 'User does not have any posts'});
    else res.status(200).send({ posts: posts }); 
  } catch (error) {
    console.log(error);
    // throw error;
  }
});



// Selects featured post. Can only be one featured post. Updates 2 posts


router.patch("/:id/:postID", async (req, res) => {
  try {
    const {userID, postID} = req.body;

    const featuredPost = await Post.find({ featured: true }, "id title featured author");

    if (featuredPost[0]) {
      // change featuredPost to false in old featured post
      const oldPost = await Post.findByIdAndUpdate(featuredPost[0]._id, {
        featured: false
      });
    }

    // change featuredPost to true in new featured post
    const post = await Post.findByIdAndUpdate(postID, {
      featured: true
    });

    if (!post) res.status(404).send({ success: false, message: "Couldn't set featured post"});

    res.status(200).send({
      success: true,
      message: 'Post set to featured',
      post: post
    });

  } catch (error) {
    console.log(error);
  }
});



module.exports = router;