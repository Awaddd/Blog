const express = require("express");
const router = express.Router();
const sendMail = require('../helpers/mail.js');

router.get("/", async (req, res) => {
  res.json({message: 'HEY!'});
});



// email admin

router.post("/", async (req, res) => {
  console.log('-----------------------------------');
  console.log('-----------------------------------');
  console.log('data, ', req.body);
  console.log('-----------------------------------');
  console.log('-----------------------------------');

  try {
    
    const {email, subject, text} = req.body;

    sendMail(email, subject, text, (err, data) => {
      if (err) res.status(500).json({message: 'Something went wrong. Please try again.'})
      else res.status(200).json({message: 'Email sent!'});
    });

  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
