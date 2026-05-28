const express = require('express')
const CART = require('../models/cart')
const PRODUCT = require('../models/product')

const router = express.Router()

router.post('/add', async (req, res) => {

    console.log(req.body)
    
    const productId  = req.body.prodId
    const userId = req.body._id
    console.log(productId, userId)
    console.log(req.user)

    let cart = await CART.findOne({ user: userId })

    if (!cart) {
        cart = new CART({
            user: userId,
            items: []
        })
    }

    const existingItem = cart.items.find(
        item => item.product.toString() === productId
    )

    if (existingItem) {
        existingItem.quantity += 1
    } else {

        const product = await PRODUCT.findById(productId)

        cart.items.push({
            product: product._id,
            name: product.title,
            price: product.price,
            image: product.images[0],
            quantity: 1
        })
    }

    cart.totalPrice = cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    )

    await cart.save()

    res.json({success:true, message:"Added to Cart", cart})
}
)

module.exports = router;