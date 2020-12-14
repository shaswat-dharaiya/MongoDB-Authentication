const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const {mongoUrl, jwtKey} = require('../../../keys');
const User = mongoose.model('User')

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

module.exports = requireToken