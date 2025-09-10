const User = require("../models/user.js");
const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");



router.get('/sign-up', (req,res) => {
    res.render('auth/sign-up.ejs');
});

router.get('/sign-in', (req,res) => {
res.render('auth/sign-in.ejs');
});
// Sign-up create new user

router.post('/sign-up', async (req, res) => {
const userInDatabase = await User.findOne({ username: req.body.username });

if (userInDatabase) {
    return res.send('Username or Password is invalid');
}

if (req.body.password !== req.body.confirmPassword) {
    return res.send('Password and Confirm Password must match');
}

const hashedPassword = bcrypt.hashSync(req.body.password, 10);
req.body.password = hashedPassword;

const user = await User.create(req.body);
res.send(`Thanks for signing up ${user.username}`);

});

// Sign-in 

router.post('/sign-in', async (req,res) =>{
    const userInDatabase = await User.findOne({ username: req.body.username});
    if (!userInDatabase) {
        return res.send('Username or Password is invalid');
    }

    const validPassword = bcrypt.compareSync(
        req.body.validPassword,
        userInDatabase.password
    );

    if (!validPassword) {
        return res.send('Username or Password is invalid');
    }
});
module.exports = router;