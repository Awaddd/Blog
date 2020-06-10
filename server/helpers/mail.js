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

const sendMail = (email, subject, text, callback) => {

  const mailOptions = {
    from: email,
    to: 'awad.dini@hotmail.co.uk',
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
