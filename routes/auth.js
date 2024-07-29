const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();


router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;
    
    let user = await User.findOne({ email });
    if (user) return res.status(400).send('User already exists.');

    user = new User({ username, email, password, role });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    
    await user.save();

    // const token = jwt.sign({ _id: user._id, role: user.role }, 'jwt_secret');
    res.send(user);
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    const token = jwt.sign({ _id: user._id, role: user.role }, 'jwt_secret');
    res.send(token);
});

module.exports = router;
