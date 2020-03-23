const JWT = require('jsonwebtoken');
const {privateKey} = require('./config.json');

module.exports = {
  verifyToken(req) {
    console.log('----------------------');
    console.log('verifying token from helper');
    console.log('----------------------');
    const jwttoken = req.header('Authorization');
    const tokenArray = jwttoken.split(" ");
    const decoded = JWT.verify(tokenArray[1], privateKey);
    return decoded;
  }
};