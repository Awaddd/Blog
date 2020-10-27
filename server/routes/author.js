const express = require("express");
const router = express.Router();
const {checkLoggedIn, isLoggedIn, upload} = require('../middleware');
const Post = require("../models/post");
const Category = require("../models/category");

// Get author post
router.get("/", async (req, res) => {
  try {

    const categoryID = await Category.findOne({ name: 'Author' }, "_id");
    const authorPost = await Post.findOne({ category: categoryID }, "title summary content createdAt category").populate('category', 'name').exec();
    if (!authorPost) res.status(404).send({ status: false, message: 'Author post not found' });
    else res.status(200).send(authorPost);

  } catch (error) {
    console.log(error);
  }
});



// update author post
// router.patch("/:id/", checkLoggedIn, isLoggedIn, async (req, res) => {
router.patch("/:id/", async (req, res) => {

  const userID = req.params.id;
  const { title, summary, content } = req.body;
  let updatedAuthorPost = {};

  try {

    if (title) updatedAuthorPost.title = title;
    if (summary) updatedAuthorPost.title = summary;
    if (content) updatedAuthorPost.title = content;

    const authorPost = await Post.findByIdAndUpdate(userID, updatedAuthorPost);

    if (!authorPost) res.status(404).send({ success: false, message: 'Could not find author post' });
    else res.status(200).send({ success: true, message: 'Author post updated successfully' });

  } catch (error) {
    console.log(error);
  }
});


module.exports = router;
