# MongoDB-Authentication

## Table of contents
* [General info](#general-info)
* [Technology](#technology)
* [Packages](#packages)
* [Features](#features)
* [Functionality](#functionality)

## General info
This directory contains Back-End of the Project. It is developed using MongoDB & Node.js.

## Technology
Project is created with:
* MongoDB
* Node.js

## NPM Packages
* [Express](https://www.npmjs.com/package/express)
* [Body Parser](https://www.npmjs.com/package/body-parser)
* [Mongoose](https://www.npmjs.com/package/mongoose)
* [Json Web Token](https://www.npmjs.com/package/jsonwebtoken)
* [Bcrypt](https://www.npmjs.com/package/bcrypt)

## Features
* Authentication
* Check if a user exist or not.
* Validating a user

## Functionality
* Define and Import DB Schema from [User.js](https://github.com/shaswat-dharaiya/MongoDB-Authentication/blob/main/Node/Model/User.js) file
```
//This is User.js file
const mongoose = require('mongoose')
const dbSchema = mongoose.Schema;
const bcrypt = require('bcrypt')

// DB Schema
const userSchema = new dbSchema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type: String,
        required: true
    },
})
```
```
// Password hashing
userSchema.pre('save', function(next){
    const user = this;
    if(!user.isModified('password')){
        return next()
    }
    bcrypt.genSalt(10, (err,salt) => {
        if(err){
            return next(err)
        }
    bcrypt.hash(user.password, salt, (err,hash) => {
        if(err){
            return next(err)
        }
        user.password = hash;
        next()
    })
    })
})
```
```
// Comparing Entered password with that of User password
userSchema.methods.comparePassword = function(candidatePassword) {
    const user = this
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword,user.password, (err,isMatch) => {
            if(err){
                return reject(err)
            }
            if(!isMatch){
                return reject(err)
            }
            resolve(true)
        })
    })
}
```
```
// Export the model.
mongoose.model('User', userSchema)
```
```
//This is index.js file
require('./Model/User')
```
* Connect to MongoDB server using mongoose. *mongoUrl* is imported from *keys.js* file.
```
//This is index.js file

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('Mongo Connected')
})

mongoose.connection.on('error', (err) => {
    console.log('Mongo not Connected', console.err)
})
```
* Authentication routes([authRoutes.js](https://github.com/shaswat-dharaiya/MongoDB-Authentication/blob/main/Node/Routes/authRoutes.js) file) has two parts.
  1. Sign Up:
  ```
  // 'async' & 'await' are used for syncing the process.
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
  ```
  2. Sign In:
  ```
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
  ```
* JSON Web Token Generation is used to login an authorized user ([requireToken.js](https://github.com/shaswat-dharaiya/MongoDB-Authentication/blob/main/Node/Middleware/requireToken.js) file). This is the middleware of the Back-end process.
```
// Import necessary files
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const { jwtKey } = require('../keys');
const User = mongoose.model('User')
```
```
const requireToken = (req, res, next) => {
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).send('Authorization Error: You must be logged in.')
    }
    const token = authorization.replace('Bearer ', '')
    jwt.verify(token, jwtKey, async (err, payload) => {
    if(err){
        return res.status(401).send('Authorization Error: You must be logged in.')
    }
    const {userId} = payload
    const user = await User.findById(userId)
    req.user=user;
    next()
})
}
```
