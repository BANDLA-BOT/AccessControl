"use strict";

var express = require('express');

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var User = require('../models/User');

var router = express.Router();
router.post('/register', function _callee(req, res) {
  var _req$body, username, email, password, role, user, salt;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password, role = _req$body.role;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 3:
          user = _context.sent;

          if (!user) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(400).send('User already exists.'));

        case 6:
          user = new User({
            username: username,
            email: email,
            password: password,
            role: role
          });
          _context.next = 9;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 9:
          salt = _context.sent;
          _context.next = 12;
          return regeneratorRuntime.awrap(bcrypt.hash(password, salt));

        case 12:
          user.password = _context.sent;
          _context.next = 15;
          return regeneratorRuntime.awrap(user.save());

        case 15:
          // const token = jwt.sign({ _id: user._id, role: user.role }, 'jwt_secret');
          res.send(user);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.post('/login', function _callee2(req, res) {
  var _req$body2, email, password, user, validPassword, token;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 3:
          user = _context2.sent;

          if (user) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(400).send('Invalid email or password.'));

        case 6:
          _context2.next = 8;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 8:
          validPassword = _context2.sent;

          if (validPassword) {
            _context2.next = 11;
            break;
          }

          return _context2.abrupt("return", res.status(400).send('Invalid email or password.'));

        case 11:
          token = jwt.sign({
            _id: user._id,
            role: user.role
          }, 'jwt_secret');
          res.send(token);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  });
});
module.exports = router;
//# sourceMappingURL=auth.dev.js.map
