const JWT = require('jsonwebtoken');
const {privateKey} = require('./config.json');
const {verifyToken} = require('./helpers.js');
const User = require("./models/user");

module.exports = {
  // checkLoggedIn runs on every endpoint regardless of if it's a public or private endpoint. Checks and sets.
  async checkLoggedIn(req, res, next) {
    try {

     // retrieve token from header
     // verify token
     // call db and see if user exists
     // logged in. next.

      console.log("--------- ");
      console.log('inside midware');
      console.log("--------- ");

      // console.log(JSON.stringify(req.headers));
      const decoded = verifyToken(req);
      console.log(decoded);      
      req.user = await User.findById(decoded.userID).select('-password');
      console.log(JSON.stringify(req.user));

      next();

    } catch (error) {
      next({status: 401, message: 'Invalid token'});
    }
  },
  // runs only on private endpoints. Confirms.
  isLoggedIn(req, res, next) {
    if (!req.user) {
      next('Not logged in');
      return;
    } 
    console.log('Logged In.');
    next();
  }
};
