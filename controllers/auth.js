const express = require("express")
const router = express.Router()
const User = require("../models/user.js")
const bcrypt = require("bcrypt")

router.get("/sign-up", (req, res) => {
    res.render("auth/sign-up.ejs")
})

router.post("/sign-up", async (req, res) => {
    const userInData = await User.findOne({username: req.body.username})
    if (userInData) {
        return res.send ("That's not gonna fly, pal - that username's taken!")
    }

    if (req.body.password !== req.body.confirmPassword) {
        return res.send("That's not gonna fly, pal - you didn't confirm your password right!")
    }

    if (req.body.password.length < 8) {
        return res.send("That's not gonna fly, pal - your password isn't 8 characters or more!")
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword
    const user = await User.create(req.body)

    res.send(`Welcome, ${user.username}!`)
})

router.get("/sign-in", (req, res) => {
    res.render("auth/sign-in.ejs")
})

module.exports = router