const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require("../models/user");

router.post("/", (req, res) => {
  var db = req.db;
  let match = null;

  // const param = req.body.email;
  // const param = req.body.password;

  const {email, password} = req.body; 

  console.log(req.body.email, req.body.password);

  User.findOne({ email: email }, "email password isAdmin", function(
    error,
    user
  ) {
    if (error) {
      console.log(error);
    }

    if (!user){
      return res.status(400).send(["Cannot log in"]);
    }

    bcrypt.compare(req.body.password, password, function(err, res) {

      if(res === true){
        match = true;
        console.log("details match");

      }
    });

    if(match === true){
      res.send({
        success: true,
        message: 'Logged in!'
      })
    }


    // compare passwords using bcrypt, NOT BCRYPTJS, if correct
    // something something JWT, store mongodb id of the user and is admin part

    res.send("fail");
  });

});

module.exports = router;
