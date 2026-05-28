const express = require('express');
const USER = require('../models/user');

const router = express.Router()

router.get('/:id', async(req,res) => {
    const {id} = req.params
    try {
        const profile = await USER.findById({_id:id})
        if(profile){
            return res.json({success:true, profile, message:"Profile data fetched successfully"})
        }else{
            return res.json({success:false, message:"No such profile exists"})
        }
    } catch (error) {
        return res.status(500).json({success:false, message:"Internal Server Error"})
    }
})

module.exports = router