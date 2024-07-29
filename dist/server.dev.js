"use strict";

var express = require('express');

var cors = require('cors');

var nodemailer = require('nodemailer');

var hbs = require('nodemailer-express-handlebars');

var mongoose = require('mongoose');

var authRoutes = require('./routes/auth');

var privateRoutes = require('./routes/private');

var randomString = require('randomstring');

var app = express(); // Middleware

app.use(express.json());
app.use(cors()); // Routes

app.use('/api/auth', authRoutes);
app.use('/api/private', privateRoutes); //Configure handlebars 

var hbsOptions = {
  viewEngine: {
    defaultLayout: 'baseMessage',
    partialsDir: 'views',
    layoutsDir: 'views'
  },
  viewPath: 'views'
};
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bguru757@gmail.com',
    pass: 'xpgzyyfbkeggfmod'
  }
});
transporter.use('compile', hbs(hbsOptions));

function sendEmail(to, subject, template, context) {
  var mailOptions = {
    from: 'bguru757@gmail.com',
    to: to,
    subject: subject,
    template: template,
    context: context
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Message sent');
    }
  });
}

sendEmail('bguru757@gmail.com', 'Dynamic email Templates with nodemailer-express-handlebars', 'message', {
  access: '123456'
}); // MongoDB Connection

mongoose.connect('mongodb://localhost:27017/roleBasedAccess').then(function () {
  return console.log('MongoDB connected...');
})["catch"](function (err) {
  return console.log(err);
}); // async function generateOTP (){
//     return randomString.generate({
//         length:6,
//         charset:'numeric'
//     })
// }
// const OTP = generateOTP()
// console.log(OTP)

var PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
  return console.log("Server running on port ".concat(PORT));
});
//# sourceMappingURL=server.dev.js.map
