const mongoose = require("mongoose")
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        firstName:{
            type: "String",
            required: true,
            trim: true
        },
        lastName:{
            type: "String",
            required: true,
            trim: true
        }
    }, 

    address: {
        house: {
            type: "String",
            required: true,
            trim: true
        },
        landmark: {
            type: "String",
            trim: true
        },
        city: {
            type: "String",
            required: true,
            trim: true
        },
        pincode: {
            type: "Number",
            required: true
        }
    },

    mobile: {
        type: "Number",
        unique: true,
        maxlength: 10
    },

    email: {
        type: "String",
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
    },
    
    password:{
        type:"String",
        required:true,
        trim:true,
        minLength:7,
        validate(value){
            if(value.includes('password')){
                throw new Error('Password cannot contain "Password"')
            }
        }

    },

    cart:[{
        productid:{
            type: "String",
            trim: true,
            unique: true
        },
        items: {
            type: "Number",
            default:1
        }
    }],

    orders:[{
        products: [{
            productid:{
                type: "String",
                trim: true,
                unique: true
            },
            items: {
                type: "Number",
                default:1
            }
        }],
        amount:{
            type:"Number",
            required:true
        },
        date:{
            type:"Date",
            required:true
        }
    }],

    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],


}, {
    timestamps:true
})

userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.timestamps
    delete userObject.tokens
    return userObject
}

//login
userSchema.statics.findByCredentials = async (email, password) =>{
    const user = await User.findOne({email:email})
    if(!user){
        throw new Error("Unable to login")
    }

    try{
        const salt = '$2b$10$X4kv7j5ZcG39WgogSl16au'
        const hashedPassword = await bcrypt.hash(password, salt)
        if(hashedPassword == user.password) return user
        else throw new Error("Unable to login")
    }
    catch(e){
        throw new Error("Error while querying")
    }
    
}


//generate auth token
userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()}, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

//hash the plaintext password
userSchema.pre('save', async function(next){
    const user = this

    if(user.isModified('password')){
        const salt = '$2b$10$X4kv7j5ZcG39WgogSl16au'
        user.password = await bcrypt.hash(user.password, salt)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User

// var jon = new User({
//     name: { firstName: 'Jon', lastName: 'Snow' },
//     address: { house: '301', city: 'Pune', pincode: 411044 },
//     mobile: 9988776677,
//     email: 'jonsnow@gmail.com',
//     password: 'Red@1234'
//   })
// console.log("Saving user")
// const us = jon.save()
// console.log("done", us)