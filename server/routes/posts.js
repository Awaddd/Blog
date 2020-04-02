const express = require("express");
const Joi = require('@hapi/joi');
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



// Get One Post


router.get("/:title", (req, res) => {
  console.log(`param: ${req.params.title}`);

  const param = req.params.title.replace(/\-+/g, " ");
  console.log(param);

  // the "title content" refers to what columns to retrieve from the doc

  Post.findOne({ title: param }, "title summary content image tags createdAt", function(
    error,
    post
  ) {
    if (error) {
      console.log(error);
    }
  }).populate('author', 'firstName lastName')
  .exec()
  .then(post => {
    res.status(200).json({
      title: post.title,
      summary: post.summary,
      content: post.content,
      image: post.image,
      tags: post.tags,
      createdAt: post.createdAt,
      author: `${post.author.firstName} ${post.author.lastName}`
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});



// Get post by ID


router.get("/id/:id", (req, res) => {
  console.log(`param: ${req.params.id}`);

  const param = req.params.id;
  console.log(param);

  Post.findOne({ _id: param }, "title summary content tags", function(
    error,
    post
  ) {
    if (error) {
      console.log(error);
    }
  })
  .exec()
  .then(post => {
    res.status(200).json({
      title: post.title,
      summary: post.summary,
      content: post.content,
      tags: post.tags,
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});



// Add new post


router.post("/", upload.single('image'), checkLoggedIn, isLoggedIn, (req, res) => {
  console.log("inside post post");
  console.log(req.body);
  console.log(req.file);
  
  console.log("---------------");
  console.log("pre validation");
  console.log(req.body.tags);
  console.log("---------------");

  req.body.tags = JSON.parse(req.body.tags);
  
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send({success: false, message: error.details[0].message});

  console.log('-- POST VAL --');

  const title = req.body.title.toLowerCase();
  const summary = req.body.summary;
  const tags = req.body.tags;
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



// Update Post


router.patch('/:id', upload.none(), (req, res) => {
  const postID = req.params.id;

  req.body.tags = JSON.parse(req.body.tags);
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send({success: false, message: error.details[0].message});

  const {title, summary, content, tags} = req.body;
  
  Post.findByIdAndUpdate(postID, {
    title: title.toLowerCase(),
    summary: summary,
    content: content,
    tags: tags
  })
  .exec()
  .then(result => {
  console.log(result);
    res.status(200).json({message: 'Successfully updated'});
  })
  .catch(err => {
  console.log(err);
    res.status(400).json({
      error: err
    });
  });
});



// Delete Post


router.delete('/:id', checkLoggedIn, isLoggedIn, (req, res) => {

  const postID = req.params.id;
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



// Post validation


function validatePost(post) {
  
  const schema = Joi.object({
    title: Joi.string()
      .min(7)
      .required(),
    summary: Joi.string()
      .min(5)
      .required(),
    content: Joi.string()
      // .min(100)
      .required(),
    tags: Joi.array()
  });
  return schema.validate(post);
}



module.exports = router;
