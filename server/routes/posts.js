const express = require("express");
const Joi = require('@hapi/joi');
const router = express.Router();
const {checkLoggedIn, isLoggedIn, upload} = require('../middleware');
const JWT = require('jsonwebtoken');
const {privateKey} = require('../config.json');
const {verifyToken} = require('../helpers.js');
const Post = require("../models/post");
const User = require("../models/user");


// Get all posts


router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({}, "title summary content image createdAt tags").sort({ _id: -1 });;
    if (!posts) res.status(404).send({ status: false, message: 'Posts not found' });
    res.status(200).send({ posts: posts });
  } catch (error) {
    console.log(error);
    // throw(error);
  }
});



// Get One Post


router.get("/:title", async (req, res) => {
  try {
    const param = req.params.title.replace(/\-+/g, " ");
    const post = await Post.findOne({ title: param }, "title summary content image tags createdAt").populate('author', 'firstName lastName').exec();
    if (!post) res.status(404).send({ success: false, message: 'Post not found' });
    res.status(200).json({
      title: post.title,
      summary: post.summary,
      content: post.content,
      image: post.image,
      tags: post.tags,
      createdAt: post.createdAt,
      author: `${post.author.firstName} ${post.author.lastName}`
    });
  } catch (error) {
    console.log(error);
    // throw(error);
  }
});


// Get post by ID


router.get("/id/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id }, "title summary content tags");
    if (!post) res.status(404).send({ success: false, message: 'Post not found' });
    res.status(200).send(post);
  } catch (error) {
    // console.log(error);
    throw(error);
  }
});



// Add new post
router.post("/", upload().single('image'), checkLoggedIn, isLoggedIn, async (req, res) => {

  req.body.tags = JSON.parse(req.body.tags);
  const { error } = validatePost(req.body);

  if (error) return res.status(400).send({success: false, message: error.details[0].message});

  const image = `${process.env.URL}/uploads/${req.file.filename}`;
  const {summary, content, tags} = req.body;
  const title = req.body.title.toLowerCase();
  console.log(tags);

  const userID = verifyToken(req).userID;

  try {

    const user = await User.findOne({ _id: userID}, "_id");
    const existingPost = await Post.findOne({ title: title }, "title summary content image");

    if (existingPost) res.status(400).send({ success: false, message: 'A post with that title already exists', field: 'title' });

    const new_post = new Post({
      title: title,
      summary: summary,
      content: content,
      image: image,
      tags: tags,
      author: userID
    });

    const post = await new_post.save();
    if (post) res.status(200).send(post);
    
  } catch (error) {
    console.log(error);
    // return res.status(404).send({ success: false, message: 'Post could not be created' });
    // throw(error);
  }

});



// Update Post


router.patch('/:id', upload().none(), checkLoggedIn, isLoggedIn, async (req, res) => {
  const postID = req.params.id;

  req.body.tags = JSON.parse(req.body.tags);
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send({success: false, message: error.details[0].message});

  const {title, summary, content, tags} = req.body;

  try {

    const existingPost = await Post.findOne({ title: title }, "title summary content image");
    if (existingPost) res.status(400).send({ success: false, message: 'A post with that title already exists', field: 'title' });

    const post = await Post.findByIdAndUpdate(postID, {
      title: title.toLowerCase(),
      summary: summary,
      content: content,
      tags: tags
    });

    if (!post) res.status(404).send({ success: false, message: 'Could not find post' });

    res.status(200).send({ success: true, message: 'Post edited successfully' });
    
  } catch (error) {
    console.log(error);
    // throw(error);
  }
});



// Delete Post


router.delete('/:id', checkLoggedIn, isLoggedIn, async (req, res) => {
  try {

    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) res.status(404).send({ success: false, message: 'Could not find post' });
    res.status(200).send({ success: true, message: 'Post deleted successfully' });

  } catch (error) {
    console.log(error);
    return res.status(404).send({ success: false, message: 'Post could not be deleted' });
    // throw(error);
  }
});



// Post validation


function validatePost(post) {
  
  const schema = Joi.object({
    title: Joi.string()
      .min(7)
      .required(),
    summary: Joi.string()
      .min(5)
      .max(100)
      .required(),
    content: Joi.string()
      // .min(100)
      .required(),
    tags: Joi.array()
  });
  return schema.validate(post);
}



module.exports = router;
