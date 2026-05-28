const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    products: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            required: true,
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
        },
        price:{
            type:Number,
            required:true,
        }
    }],
    address: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    paymentMethod: {
        type: String,
        enum: ['PP']
    },
    paymentStatus: {
        type: Boolean,
        default: false,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    Date: {
        type:Date,
        default: new Date()
    },
    paymentId: {
        type:String,
        required:true,
    }

}, {timestamps: true})

const ORDER = new mongoose.model('order', orderSchema)

module.exports = ORDER;