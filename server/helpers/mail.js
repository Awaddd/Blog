const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');
const {mailgunAuth} = require('../config.json');

const auth = {
  auth: {
    api_key: mailgunAuth.key,
    domain: mailgunAuth.domain
  }
}

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (email, to, subject, text, callback) => {

  const mailOptions = {
    from: email,
    to: to,
    subject,
    text
  }
  
  transporter.sendMail(mailOptions, function(err, data) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });

}

module.exports = sendMail;
