"use strict";

var jwt = require('jsonwebtoken');

var auth = function auth(req, res, next) {
  var token = req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    var decoded = jwt.verify(token, 'jwt_secret');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send('Invalid token.');
  }
};

module.exports = auth;
//# sourceMappingURL=auth.dev.js.map
