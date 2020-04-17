const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const { validateLogin } = require('../helpers/validation.js');
const {signToken} = require('../helpers/helpers.js');

const User = require("../models/user");

router.post("/", async (req, res) => {

  console.log(req.body.email, req.body.password);

  const { error } = validateLogin(req.body);
  if (error) console.log(error.details[0].message);
  if (error) return res.status(400).send({success: false, message: error.details[0].message});

  const {email, password} = req.body;

  try {

    const user = await User.findOne({ email: email.toLowerCase()}, "email password isAdmin");
    if (!user) return res.status(401).send({success: false, message: "Email is incorrect", field: 'email'});

    const passwordCompareSuccess = await bcrypt.compare(password, user.password);
    
    if (passwordCompareSuccess === false) {
      res.status(401).send({success: false, message: "Password is incorrect", field: 'password'});
      return;
    } 

    const token = signToken(user);

    res.status(200).send({
      success: true,
      message: 'Logged in!',
      user: token
    });
    
  } catch (error) {
    console.log(error);
  }
});



module.exports = router;
