const JWT = require('jsonwebtoken')
require('dotenv').config()

const secret_key = process.env.JWT_SECRET

function GenerateToken(user){
    const payLoad = {
        _id: user._id,
        userName:user.userName,
        email: user.email,
        role: user.role,
    }

    const token = JWT.sign(payLoad, secret_key);
    return token;
};

const validateToken = async(token)=>{
    // console.log(token)
    const payLoad = JWT.verify(token, secret_key);
    if(!payLoad) throw new Error("Invalid Token");
    return payLoad ;
}
   
module.exports = {
    GenerateToken, validateToken,
}