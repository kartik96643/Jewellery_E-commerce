const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        requried: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type:String,
        enum: ['ADMIN','CUSTOMER','SELLER'],
        default:'CUSTOMER'
    }
}, { timestamps: true, })

const USER = new mongoose.model('user', userSchema)

module.exports = USER;
