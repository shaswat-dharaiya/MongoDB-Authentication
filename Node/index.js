const express = require('express')
const app = express()
const PORT = 3000
const bodyParser = require('body-parser')
const {mongoUrl} = require('../../keys')
const mongoose = require('mongoose')

require('./Model/User')
const authRoutes = require('./Routes/authRoutes')
const requireToken = require('./Middleware/requireToken')
app.use(bodyParser.json())
app.use(authRoutes)


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

app.get('/', requireToken,(req,res) => {
    console.log({email:req.user.email})
    res.send({email:req.user.email})
}
)

app.listen(PORT, () => {
    console.log('Server is running')   
})