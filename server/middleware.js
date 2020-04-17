const JWT = require('jsonwebtoken');
const multer = require('multer');
const {privateKey} = require('./config.json');
const {verifyToken} = require('./helpers/helpers.js');
const User = require("./models/user");

const storage = multer.diskStorage({
  destination: function (req, file, callback){
    callback(null, './uploads/')
  },
  filename: function (req, file, callback){
    callback(null,`${Date.now()}-${file.originalname}`);
  }
})

const fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    callback(null, true);
  } else {
    callback('Incorrect File Type. Upload .jpeg or .png files only.', false);
  }
};


module.exports = {
  // checkLoggedIn runs on every endpoint regardless of if it's a public or private endpoint. Checks and sets.
  async checkLoggedIn (req, res, next) {
    try {

      const decoded = verifyToken(req);
      console.log(decoded);      
      req.user = await User.findById(decoded.userID).select('-password');
      next();

    } catch (error) {
      console.log(error);
      next({status: 401, message: 'Next Error'});
    }
  },
  // runs only on private endpoints. Confirms.
  isLoggedIn (req, res, next) {
    if (!req.user) {
      next({status: 401, message: 'Not logged in'});
      return;
    } 
    console.log('Logged In.');
    next();
  },
  upload () {
    return multer({
      storage: storage, 
      limits: {
        fileSize: 1024 * 1024 * 5
      },
      fileFilter: fileFilter
    });
  }
};
