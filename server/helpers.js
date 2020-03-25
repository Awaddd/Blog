const JWT = require('jsonwebtoken');
const {privateKey} = require('./config.json');

module.exports = {
  verifyToken(req) {
    if (!req.header('Authorization')){
      return 'no token';
    } else {
      console.log('----------------------');
      console.log('verifying token from helper');
      console.log('----------------------');
      const jwttoken = req.header('Authorization');
      const tokenArray = jwttoken.split(" ");
      const decoded = JWT.verify(tokenArray[1], privateKey, (err, decoded) => err ? err.message : decoded);

      console.log(JSON.stringify(decoded));
      return decoded;
    }
  }
};