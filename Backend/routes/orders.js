const express = require('express')
const ORDER = require('../models/order')
const PRODUCT = require('../models/product')

const router = express.Router()

router.get('/:id', async(req,res) => {
    const _id = req.params.id
    // console.log(_id)
    try {
        const orders = await ORDER.find({user:_id}).sort({createdAt:-1})
        // console.log(orders)
        return res.status(200).json({success:true, message:"Orders fetched successfully", orders})
    } catch (error) {
        return res.status(500).json({success:false, message:"Internal server error"})
    }
})

router.get('/sell/:id', async (req, res) => {
    const _id = req.params.id;

    try {

        const orders = await ORDER.find({
            products: {
                $elemMatch: { seller: _id }
            }
        }).sort({ createdAt: -1 });

        // ✅ keep only seller products in each order
        const filteredOrders = orders.map(order => {

            const sellerProducts = order.products.filter(
                prod => prod.seller.toString() === _id
            );

            return {
                ...order._doc,
                products: sellerProducts
            };
        });

        return res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            orders: filteredOrders
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

module.exports = router