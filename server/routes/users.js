const express = require("express");
const router = express.Router();
const Joi = require("joi");

const User = require("../models/user");

router.get("/:email", (req, res) => {
  var db = req.db;
  console.log(`param: ${req.params.email}`);

  const param = req.params.email;
  console.log(param);

  User.findOne({ email: param }, "email firstname lastname password isAdmin", function(
    error,
    user
  ) {
    if (error) {
      console.log(error);
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
        password: password,
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



