const mongoose = require('mongoose')
const dbSchema = mongoose.Schema;
const bcrypt = require('bcrypt')

// Access User Schema
const accessSchema = new dbSchema({    
    email:{
        type: String,
        required: true,
        default: "",
    },
})

// Member User Schema
const memberSchema = new dbSchema({    
    name:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    number:{
        type: String,
        required: true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    access: {
        type: [accessSchema],
        default: undefined,
    },
    imageUrl:{
        type: String,
        required: true,
        default: "",
    },
    pin:{
        type: Number,
        required: true
    },    
})

// Root User Schema
const userSchema = new dbSchema({    
    // name:{
    //     type: String,
    //     required: true
    // },
    // surname:{
    //     type: String,
    //     required: true
    // },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type: String,
        required: true
    },
    // members: {
    //     type:[memberSchema],
    //     default: undefined,
    // },
})

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

mongoose.model('User', userSchema)