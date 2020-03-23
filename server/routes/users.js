const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const Joi = require("joi");
const {verifyToken} = require('../helpers.js');

const User = require("../models/user");
const Post = require("../models/post");

router.get("/:id", (req, res) => {
  var db = req.db;

  const user = req.params.id;
  
  console.log("---------------------");
  console.log(`Finding by user id: ${user}`);
  console.log("---------------------");

  console.log("--------- ");

  console.log(JSON.stringify(req.headers));
  console.log("--------- ");


  User.findOne({ _id: user }, "email firstName lastName isAdmin", function(
    error,
    user
  ) {
    if (error) {
      console.log(`error: ${error}`);
    }
    console.log(user);
    res.send(user);
  });
});

router.get("/",(req, res) => {
  User.find({}, "email firstName lastName password isAdmin", function(error, users) {
    if (error) {
      console.error(eror);
    }
    res.send({
      users: users
    });
  }).sort({ _id: -1});
});

router.post("/", (req, res) => {

  var db = req.db;
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;


  console.log(firstName);
  console.log(lastName);
  console.log(email);
  console.log(password);

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

 
  User.findOne({email: email}, "email, firstName, lastName, password, isAdmin", function(
    error,
    user
  ) {
    if (error) {
      console.log(error);
    } else if (user) {
      res.send({
        success: false,
        message: "User exists"
      });
    } else {
      const new_user = new User({
        email: email,
        firstName: firstName,
        lastName: lastName, 
        password: hashedPassword,
        isAdmin: false
      });

      new_user.save(function(error) {
        if (error) {
          console.log(error);
        }

        res.send({
          success: true,
          message: "User created!"
        });
      }) 
    }
  })

});

// Get posts for one user

router.get("/:id/posts", (req, res) => {
  var db = req.db;
  
  const userID = verifyToken(req).userID;

  Post.find({author: userID}, "title summary content image author createdAt", (error, posts) => {
    if (error) {
      console.log(error);
    }
    res.send({
      posts: posts
    });
  }).sort({ _id: -1 });
});

function validateUser(user) {
  const schema = {
    email: Joi.string()
      .email({ minDomainAtoms: 2 }),
    firstName: Joi.string()
      .min(2),
    lastName: Joi.string()
      .min(2),
    password: Joi.string()
      .min(7),
    isAdmin: Joi.string()
  };

  return Joi.validate(user, schema);
}


module.exports = router;



