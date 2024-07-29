"use strict";

var express = require('express');

var auth = require('../middlewares/auth.js');

var role = require('../middlewares/role.js');

var router = express.Router();
router.get('/admin', auth, role('admin'), function (req, res) {
  res.send('Welcome to the admin panel.');
});
router.get('/instructor', auth, role('instructor'), function (req, res) {
  res.send('Welcome to the instructor panel.');
});
router.get('/student', auth, role('student'), function (req, res) {
  res.send('Welcome to the student panel.');
});
module.exports = router;
//# sourceMappingURL=private.dev.js.map
