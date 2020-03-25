const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {privateKey} = require('../config.json');

const User = require("../models/user");

router.post("/", (req, res) => {

  console.log(req.body.email, req.body.password);

  User.findOne({ email: req.body.email }, "email password isAdmin", function(
    error,
    user
  ) {
    if (error) {
      console.log(error);
    }

    if (!user){
      return res.status(400).send(["Cannot log in"]);
    }
    
    bcrypt.compare(req.body.password, user.password, function(err, response) {
      if(response === true){

        const token = jwt.sign({ userID: user._id, isAdmin: user.isAdmin }, privateKey, {expiresIn: '7d'});

        // secure should be true on live.
        // res.cookie('access_token', token, {
        //   maxAge: 3600,
        //   httpOnly: false
        //   // secure: true
        // });

        res.send({
          success: true,
          message: 'Logged in!',
          user: token
        });
      }
    });

    // compare passwords using bcrypt, NOT BCRYPTJS, if correct
    // something something JWT, store mongodb id of the user and is admin part

  });

});

module.exports = router;
