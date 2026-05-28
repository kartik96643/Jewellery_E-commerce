const express = require('express');
const ORDER = require('../models/order');
const PRODUCT = require('../models/product');
require('dotenv').config()

const Razorpay = require('razorpay')

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

router.post('/', async (req, res) => {
  const { formData, cartItems, totalPrice, _id, paymentId } = req.body;

  try {

    // ✅ Prepare product array
    const products = [];

    for (let i = 0; i < cartItems.length; i++) {

      const product = await PRODUCT.findById(cartItems[i].prodId);

      if (!product) continue;

      // ❗ Check stock
      if (product.stock < cartItems[i].quantity) {
        return res.status(400).json({
          success: false,
          message: `${product.title} is out of stock`
        });
      }

      products.push({
        id: product._id,
        quantity: cartItems[i].quantity,
        seller: product.seller,
        price: product.price
      });

      // ✅ Update stock correctly
      await PRODUCT.findByIdAndUpdate(product._id, {
        $inc: { stock: -cartItems[i].quantity }
      });
    }

    console.log(products,"PRoducts")

    // ✅ Create order ONCE
    const order = await ORDER.create({
      name: formData.name,
      address: formData.address,
      paymentMethod: formData.paymentMethod,
      totalPrice,
      user: _id,
      products: products,
      paymentId: paymentId,
      paymentStatus: true,
    });

    return res.status(200).json({
      success: true,
      message: "Order successfully placed",
      order
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!"
    });
  }
});


router.post('/razorpay/create-order', async(req,res)=>{
  try {
    const {amount} = req.body
    const options = {
      amount: amount * 100,
      currency:"INR",
      receipt: "recp_id_"+Date.now()
    }
    
    const order = await razorpay.orders.create(options)
    console.log("order",order)
    return res.json({success:true, message:"Payment successful", order})
  } catch (error) {
    console.error(error)
    return res.status(500).json({success:false, message:"Internal Server Error"})
  }
})

module.exports = router;