const express = require("express");
const Joi = require("joi");
const router = express.Router();
const multer = require('multer');
const {checkLoggedIn, isLoggedIn} = require('../middleware');
const JWT = require('jsonwebtoken');
const {privateKey} = require('../config.json');
const {verifyToken} = require('../helpers.js');

const storage = multer.diskStorage({
  destination: function (req, file, callback){
    callback(null, './uploads/')
  },
  filename: function (req, file, callback){
    callback(null,`${Date.now()}-${file.originalname}`);
  }
})

const fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    callback(null, true);
  } else {
    callback('Incorrect File Type. Upload .jpeg or .png files only.', false);
  }
};

const upload = multer({
  storage: storage, 
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

const Post = require("../models/post");
const User = require("../models/user");

// Get all posts

router.get("/", (req, res) => {
  Post.find({}, "title summary content image createdAt tags", function(error, posts) {
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
  console.log(`param: ${req.params.title}`);

  const param = req.params.title.replace(/\-+/g, " ");
  console.log(param);

  // the "title content" refers to what columns to retrieve from the doc

  Post.findOne({ title: param }, "title summary content image tags", function(
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

router.post("/", upload.single('image'), checkLoggedIn, isLoggedIn, (req, res) => {
  console.log("send help 1");
  console.log(req.body);
  console.log("send help 2");
  console.log(req.file);
  // const { error } = validatePost(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const title = req.body.title.toLowerCase();
  const summary = req.body.summary;
  const tags = JSON.parse(req.body.tags);
  const body = req.body.content;
  const image = `${process.env.URL}/uploads/${req.file.filename}`;
  console.log(image);

  const userID = verifyToken(req).userID;
  console.log(userID);

  User.findOne({ _id: userID}, "_id" ,(error, user) => {
    if (error) {
      console.log(`error on line 91 posts: ${error}`);
    } else {
      console.log(user);
      Post.findOne({ title: title }, "title summary content image", function(
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
            content: body,
            image: image,
            tags: tags,
            author: userID
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
    }
  })

});

router.delete('/:id', checkLoggedIn, isLoggedIn, (req, res) => {

  const postID = req.params.id
  console.log('within delete: ', postID);

  Post.findByIdAndDelete(postID)
      .then(post => {
        if(!post) {
          return res.status(404).send({
            message: `Post not found ${postID}`
          });
        }
        res.send({message: 'Post deleted'});
      }).catch (error => {
        return res.status(500).send({message: `Could not delete: ${postID}`})
      })
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
    // tags: Joi.array().items(Joi.string().min(4))
  };

  return Joi.validate(post, schema);
}

module.exports = router;
