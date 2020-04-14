const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const Joi = require('@hapi/joi');
const {verifyToken, signToken} = require('../helpers.js');
const User = require("../models/user");
const Post = require("../models/post");




router.get("/profile/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }, "email firstName lastName password isAdmin");
    if (!user) res.status(404).send({success: false, message: 'User does not exist'});
    else res.status(200).send(user);

  } catch (error) {
    console.log(error);
  }
});



// get one user 


router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }, "email firstName lastName isAdmin");
    if (!user) res.status(404).send({success: false, message: 'User does not exist'});
    res.status(200).send(user);

  } catch (error) {
    console.log(error);
  }
});



// Register user


router.post("/", async (req, res) => {

  const { error } = validateUser(req.body);
  if (error) console.log(error.details[0].message);
  if (error) return res.status(400).send({success: false, message: error.details[0].message});

  const {firstName, lastName, email, password} = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() }, "email, firstName, lastName, password, isAdmin");
    if (existingUser) res.status(409).send({success: false, message: 'An account with that email already exists', field: 'email'});

    const new_user = new User({
      email: email.toLowerCase(),
      firstName: firstName,
      lastName: lastName, 
      password: hashedPassword,
      isAdmin: false
    });

    const user = await new_user.save();
    const token = signToken(user);
    
    res.send({
      success: true,
      message: "User created!",
      user: token
    });

  } catch (error) {
    console.log(error);
    // throw error;
  }  
});



// Get posts for one user


router.get("/:id/posts", async (req, res) => {
  try {
    const userID = verifyToken(req).userID;
    const posts = await Post.find({ author: userID }, "id title summary content image author createdAt featured").sort({ _id: -1 });
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





// User validation


function validateUser(user) {
  
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2})
      .required(),
    firstName: Joi.string()
      .min(2)
      .required(),
    lastName: Joi.string()
      .min(2)
      .required(),

    password: Joi.string()
      .min(7)
      .required()
  });

  return schema.validate(user);
}

module.exports = router;



