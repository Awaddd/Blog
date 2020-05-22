const express = require("express");
const router = express.Router();
const {checkLoggedIn, isLoggedIn, upload} = require('../middleware');
const {verifyToken} = require('../helpers/helpers.js');
const { validatePost } = require('../helpers/validation.js');
const Post = require("../models/post");
const User = require("../models/user");
const Category = require("../models/category");



// Get all posts


router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({}, "title summary content image createdAt tags category").populate('category', 'name hasMedia').sort({ _id: -1 }).exec();
    if (!posts) res.status(404).send({ status: false, message: 'Posts not found' });
    res.status(200).send({ posts: posts });
  } catch (error) {
    console.log(error);
    // throw(error);
  }
});



// Get posts based on category


router.get("/all/:pluralName", async (req, res) => {

  try {
    const category = req.params.pluralName.toLowerCase();
    const { _id } = await Category.findOne( { plural: category }, "_id" );
    const posts = await Post.find({ category: _id  }, "title summary content image createdAt tags category").populate('category', 'name hasMedia').sort({ _id: -1 }).exec();
    if (!posts) res.status(404).send({ status: false, message: 'Posts not found' });
    res.status(200).send({ posts: posts });
  } catch (error) {
    console.log(error);
  }

});



// Get post categories


router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find({}, "id name hasMedia plural");
    if (!categories) res.status(404).send({ status: false, message: 'Categories not found' });
    res.status(200).send(categories);

  } catch (error) {
    console.log(error);
  }
});



// Get Featured Post

router.get("/featured", async (req, res) => {
  try {
    const featuredPost = await Post.findOne( {featured: true }, "title summary content image tags author createdAt" );
    if (!featuredPost) res.status(404).send({ success: false, message: 'Could not find a featured post' });
    res.status(200).send(featuredPost);
  } catch (error) {
    console.log(error);
  }
});



// Get One Post


router.get("/:title", async (req, res) => {
  try {
    const param = req.params.title.replace(/\-+/g, " ");
    const post = await Post.findOne({ title: param }, "_id title summary content image tags createdAt").populate('author', 'firstName lastName').exec();
    if (!post) res.status(404).send({ success: false, message: 'Post not found' });
    res.status(200).json({
      _id: post._id,
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
    const post = await Post.findOne({ _id: req.params.id }, "category title summary content tags image");
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

  console.log(req.body.category);

  let image = null;
  if (req.file) image = `${process.env.URL}/uploads/${req.file.filename}`;

  const {category, summary, content, tags} = req.body;
  const title = req.body.title.toLowerCase();
  console.log(tags);

  const userID = verifyToken(req).userID;

  try {

    const existingPost = await Post.findOne({ title: title }, "title summary content image");

    if (existingPost) res.status(400).send({ success: false, message: 'A post with that title already exists', field: 'title' });

    let newPost = {
      title: title,
      summary: summary,
      content: content,
      tags: tags,
      author: userID,
      category: category
    };
    if (image) newPost.image = image;
    const new_post = new Post(newPost);

    const post = await new_post.save();
    if (post) res.status(200).send(post);
    
  } catch (error) {
    console.log(error);
    // return res.status(404).send({ success: false, message: 'Post could not be created' });
    // throw(error);
  }

});



// Update Post


router.patch('/:id', upload().single('image'), checkLoggedIn, isLoggedIn, async (req, res) => {

  const postID = req.params.id;

  if (req.body.tags) req.body.tags = JSON.parse(req.body.tags);

  const { error } = validatePost(req.body);
  if (error) return res.status(400).send({success: false, message: error.details[0].message});

  const {title, summary, content, tags} = req.body;

  let image = null;
  if (req.file) image = `${process.env.URL}/uploads/${req.file.filename}`;

  try {    
    const updatedPost = {
      summary: summary,
      content: content,
      tags: tags,
    }

    if (image) updatedPost.image = image;
    if (title) updatedPost.title = title.toLowerCase();

    const post = await Post.findByIdAndUpdate(postID, updatedPost);

    if (!post) res.status(404).send({ success: false, message: 'Could not find post' });
    else res.status(200).send({ success: true, message: 'Post edited successfully' });
    
  } catch (error) {
    // console.log(error);
    if (error.code = '11000') res.status(404).send({success: false, message: 'Post with that title already exists', field: 'title', error});
    throw(error);
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



module.exports = router;
