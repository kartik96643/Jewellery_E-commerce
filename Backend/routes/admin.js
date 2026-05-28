const express = require('express')
const USER = require('../models/user')

const router = express.Router()

router.get('/getAllUsers', async(req,res) => {

    try {
        const users = await USER.find({$or:[{role:"CUSTOMER"}, {role:"SELLER"}]})
        return res.status(200).json({success:true, message:"Users fetched successfully", users})
        
    } catch (error) {
        console.log(error)
        return res.json({success:false, message:"Internal Server Error"})
    }

})

module.exports = router