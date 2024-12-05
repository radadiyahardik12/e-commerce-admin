const express = require('express');
const User = require('../models/UserModal');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(200).json({ data : {status : 1, message: 'User already exists' }});


        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({ data :{status : 1, message: 'User created successfully' }});
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/signin', async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(200).json({ data: {status : 1, message: 'User not found' }});

        if (password !== user.password) return res.status(200).json({ data: {status : 1, message: 'password is wrong' }});

        res.send({ data : {status : 1, user_id : user._id} });
    } catch (error) {
        res.status(500).json({status : 0, error: 'Internal server error' });
    }
});

module.exports = router;