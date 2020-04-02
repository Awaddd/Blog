const express = require("express");
const router = express.Router();
const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {privateKey} = require('../config.json');

const User = require("../models/user");

router.post("/", (req, res) => {

  console.log(req.body.email, req.body.password);
  const { error } = validateUser(req.body);
  if (error) console.log(error.details[0].message);
  if (error) return res.status(400).send({success: false, message: error.details[0].message});

  const {email, password} = req.body;


  User.findOne({ email: email }, "email password isAdmin", function(
    error,
    user
  ) {
    
    if (error) {
      console.log(error);
    }

    if (!user){
      return res.status(400).send({success: false, message: "Email is incorrect"});
    }
    
    bcrypt.compare(password, user.password, function(err, response) {

      if (response === true){

        const token = jwt.sign({ userID: user._id, isAdmin: user.isAdmin }, privateKey, {expiresIn: '7d'});

        res.send({
          success: true,
          message: 'Logged in!',
          user: token
        });
      }

      if (response === false) {
        res.status(400).send({success: false, message: "Password is incorrect"});
      }
    });

  });

});


function validateUser(user) {
  
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2})
      .required(),
    password: Joi.string()
      .min(7)
      .required()
  });

  return schema.validate(user);
}


module.exports = router;
