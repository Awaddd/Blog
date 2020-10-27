const express = require("express");
const router = express.Router();
const User = require("../models/user");
const sendMail = require('../helpers/mail.js');

// email admin

router.post("/", async (req, res) => {

  try {
    
    const {email, subject, text} = req.body;

    let to = null;

    const user = await User.findOne({ isAdmin: {$exists: true} }, "email");
    if (!user) res.status(500).json({message: 'Something went wrong. Please try again.'});
    else {
      to = user.email;
    }


    sendMail(email, to, subject, text, (err, data) => {
      if (err) res.status(500).json({message: 'Something went wrong. Please try again.'})
      else res.status(200).json({message: 'Email sent!'});
    });

  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
