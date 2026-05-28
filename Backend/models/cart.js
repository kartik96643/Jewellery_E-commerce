const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({
    
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    image: {
        type: String
    },

    quantity: {
        type: Number,
        default: 1
    }

});

const cartSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    items: [cartItemSchema],

    totalPrice: {
        type: Number,
        default: 0
    }

}, { timestamps: true });

const CART = mongoose.model("Cart", cartSchema);

module.exports = CART;
