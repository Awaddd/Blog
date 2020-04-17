const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const { signToken } = require('../helpers/helpers.js');
const { validateUser } = require('../helpers/validation.js');
const User = require("../models/user");
const Post = require("../models/post");



// Get one user's profile


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



module.exports = router;



