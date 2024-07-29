const express = require('express');
const auth = require('../middlewares/auth.js');
const role = require('../middlewares/role.js');
const router = express.Router();


router.get('/admin', auth, role('admin'), (req, res) => {
    res.send('Welcome to the admin panel.');
});


router.get('/instructor', auth, role('instructor'), (req, res) => {
    res.send('Welcome to the instructor panel.');
});


router.get('/student', auth, role('student'), (req, res) => {
    res.send('Welcome to the student panel.');
});

module.exports = router;
