const express = require("express");
const Joi = require("joi");
const router = express.Router();

const Post = require("../models/post");

// Get all posts

router.get("/", (req, res) => {
  Post.find({}, "title summary content", function(error, posts) {
    if (error) {
      console.error(error);
    }
    res.send({
      posts: posts
    });
  }).sort({ _id: -1 });
});

// Get one posts

router.get("/:title", (req, res) => {
  var db = req.db;
  console.log(`param: ${req.params.title}`);

  const param = req.params.title.replace(/\-+/g, " ");
  console.log(param);

  // the "title content" refers to what columns to retrieve from the doc

  Post.findOne({ title: param }, "title summary content", function(
    error,
    post
  ) {
    if (error) {
      console.log(error);
    }
    console.log(post);
    res.send(post);
  });
});

// Add new post

router.post("/", (req, res) => {
  const db = req.db;

  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const title = req.body.title.toLowerCase();
  const summary = req.body.summary;
  const body = req.body.content;

  Post.findOne({ title: title }, "title summary content", function(
    error,
    post
  ) {
    if (error) {
      console.log(error);
    } else if (post) {
      res.send({
        success: false,
        message: "Post exists"
      });
    } else {
      const new_post = new Post({
        title: title,
        summary: summary,
        content: body
      });

      new_post.save(function(error) {
        if (error) {
          console.log(error);
        }

        res.send({
          success: true,
          message: "Post created!"
        });
      });
    }
  });
});

function validatePost(post) {
  const schema = {
    title: Joi.string()
      .min(4)
      .required(),
    summary: Joi.string()
      .min(4)
      .required(),
    content: Joi.string()
      .min(4)
      .required()
  };

  return Joi.validate(post, schema);
}

module.exports = router;
