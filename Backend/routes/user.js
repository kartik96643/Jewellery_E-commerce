const express = require('express');
const USER = require('../models/user')
const bcrypt = require('bcryptjs');
const { GenerateToken } = require('../services/auth');

const router = express.Router();

router.post('/signup', async (req, res) => {
    // console.log(req.body,"body");
    const { userName, email, password } = req.body;
    const isExist = await USER.findOne({ email });
    if (isExist) {
        return res.status(409).json({ success: false, message: "User with this email already exists" })
    }
    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(password, salt)
    const user = await USER.create({
        userName: userName,
        email: email,
        password: secPass,
    })
    // console.log(admin,"admin")
    return res.json({ success: true, message: "Account Created Successfully", user });

});

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log(email, password)
        if (!email || !password) {
            return res.status(404).json({ success: false, message: "All fields are mandatory" })
        }
        const user = await USER.findOne({ email })
        if (!user) {
            return res.status(404).json({ success: false, message: "No user found with this email" })
        }
        // console.log('user', user)
        const comparedPass = await bcrypt.compare(password, user.password)
        if (!comparedPass) {
            return res.status(404).json({ success: false, message: "Invalid Credentials" })
        }

        // console.log(comparedPass, 'cp')
        const token = GenerateToken(user)
        // console.log("token", token)

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,    // true in production
            sameSite: "lax",
            path: "/",
        });
        const userWithoutPass = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
        // console.log(req.user, "userwP")

        return res.status(200).json({ success: true, message: "Logged In ", userWithoutPass, token });
    } catch (error) {
        console.log("server error")
    }
})

router.post('/logout', async (req, res) => {
    try {
        res.clearCookie('token')
        return res.status(200).json({ success: true, message: "Successfully logged out" })
    } catch (error) {
        console.log("server error")
    }
})

module.exports = router;