const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { jwtKey } = require('../keys')

const User = mongoose.model('User');

// router.get('/', (req,res) => {
//     console.log(req.body)
//     res.send('Hello GET')
// })

// router.post('/', (req,res) => {
//     console.log(req.body)
//     const {email, password} = req.body
//     res.send('Hello POST')
// })

router.post('/signUp', async (req, res) => {    
    try{
        const {email, password} = req.body
        const user = new User({email, password})
        await user.save();
        const token = jwt.sign({userId: user._id}, jwtKey)
        res.send({token})

    }catch(err){
        res.status(422).send(err.message)
        console.log(`Mongo Error: ${err.message}`)
    }
})

router.post('/signin', async (req,res) => {
    const {email, password} = req.body
    if(!email || !password){
        return res.status(422).send({error: 'Must provide email & password'})
    }
    const user = await User.findOne({email})
    if(!user){
        return res.status(422).send({error: 'Must provide email & password 2'})
    }
    try{
        await user.comparePassword(password)
        const token = jwt.sign({userId: user._id}, jwtKey)
        res.send({token})
    }catch(err){
        console.log(err.message)
        return res.status(422).send({error: 'Must provide email & password 3'})
    }
})

module.exports = router