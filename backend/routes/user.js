const mongoose = require('mongoose')
const express = require('express')
const userRoute = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { userModel } = require('../models/usermodel')
userRoute.use(express.json())

//======= REGISTER ROUTER=============//

userRoute.post('/register', async (req, res) => {
    const { name, email, pass } = req.body
    try {
        bcrypt.hash(pass, 5, async (err, hash) => {
            if (err) { res.send("hello") }
            else {
                const user = new userModel({ name, email, pass: hash })
                await user.save()
                res.send({ data: 'user is registered' })
            }
        })

    } catch (err) { console.log(err) }

})

// ======================LOGIN ROUTER=============================//

userRoute.post('/login', async (req, res) => {
    const { email, pass } = req.body
    try {

        const user = await userModel.find({ email })
        if (user.length > 0) {
            bcrypt.compare(pass, user[0].pass, (err, result) => {
                if (result) {
                    let token = jwt.sign({ userID: user[0]._id }, "sheetal")
                    res.send({ "msg": "login is successfully done", "token": token })
                } else {
                    res.send({ data: 'wrong' })
                }
            })

        } else {
            res.send({ data: 'wrong credentials' })
        }
    } catch (err) { console.log(err) }

})

module.exports = { userRoute }