const express = require("express");
const router = express.Router();
const {checkLoggedIn, isLoggedIn, upload} = require('../middleware');
const Author = require("../models/author");

// Get author post
router.get("/", async (req, res) => {
  try {

    const authorPost = await Author.findOne({}, "title summary content createdAt category author").populate('author', 'firstName lastName').exec();
    if (!authorPost) res.status(404).send({ status: false, message: 'Author post not found' });
    else res.status(200).send(authorPost);

  } catch (error) {
    console.log(error);
  }
});



// update author post
router.patch("/:id/", checkLoggedIn, isLoggedIn, async (req, res) => {

  const { title, summary, content } = req.body;
  let updatedAuthorPost = {};

  try {

    if (title) updatedAuthorPost.title = title;
    if (summary !== null) updatedAuthorPost.summary = summary;
    if (content) updatedAuthorPost.content = content;

    const authorPost = await Author.findByIdAndUpdate(req.params.id, updatedAuthorPost);

    if (!authorPost) res.status(404).send({ success: false, message: 'Could not find author post' });
    else res.status(200).send({ success: true, message: 'Author post updated successfully' });

  } catch (error) {
    console.log(error);
  }
});


module.exports = router;
