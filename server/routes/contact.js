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
  const {email, subject, text} = req.body;
  sendMail(email, subject, text, function(err, data) {
    if (err) res.status(500).json({message: 'Failed to send email'})
    else res.status(200).json({message: 'Email sent!!!'});
  });
});

module.exports = router;
