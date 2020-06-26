const JWT = require('jsonwebtoken');
const {privateKey} = require('../config.json');
const Post = require("../models/post");
const User = require("../models/user");
const fs = require('fs');

module.exports = {
  verifyToken(req) {
    if (!req.header('Authorization')){
      return 'no token';
    } else {
      const jwttoken = req.header('Authorization');
      const tokenArray = jwttoken.split(" ");
      const decoded = JWT.verify(tokenArray[1], privateKey, (err, decoded) => err ? err.message : decoded);

      console.log(JSON.stringify(decoded));
      return decoded;
    }
  },
  signToken({_id, isAdmin}) {
    return JWT.sign({ userID: _id, isAdmin: isAdmin }, privateKey, {expiresIn: '7d'});
  },
  async deleteImage(postID, model) {
    try {

      if (model) {
        let image = null;
        if (model === 'post') {
          post = await Post.findOne({_id: postID}, "image");
          if (!post.image) return;
          else image = post.image;
        }
        else {
          user = await User.findOne({_id: postID}, "image");
          if (!user.image) return;
          else image = user.image;
        }
    
        image = image.split('/');
        image = `./${image[3]}/${image[4]}`;
    
        fs.unlink(image, (err) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log('FILE REMOVED! ', image);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
};