const express = require("express")
const router = express.Router()
const User = require("../models/user")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")
//Register
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        // password: req.body.password
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()

    });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
    catch (err) {
        res.status(500).json({ status: "failed", msg: err.message });
    }
});


//LOGIn
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(404).json({ status: "wrong USERNAME" });

        const hasdedpassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC)


        const passwor = hasdedpassword.toString(CryptoJS.enc.Utf8)
        passwor !== req.body.password &&
            res.status(404).json({ status: "password not valid" });

        const accesstoken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SEC,
            { expiresIn: "3d" }

        );
       
        const { password, ...other } = user._doc

        res.status(200).json({ ...other, accesstoken })
    }
    catch (err) { res.json(err.status) }
})

module.exports = router;