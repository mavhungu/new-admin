const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        unique: true,
        rewuired: true
    },
    password:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)