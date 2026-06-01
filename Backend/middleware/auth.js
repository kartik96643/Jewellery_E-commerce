const {validateToken} = require('../services/auth');

function checkToken() {
  return async (req, res, next) => {
    const token = req.cookies.token; // ✅ fixed key

    // console.log("Cookies:", req.cookies);

    if (!token) {
      req.user = null;
      return next();
    }

    try {
      const payload = await validateToken(token);
      req.user = payload;
    } catch (error) {
      console.error("Invalid token:", error);
      req.user = null;
    }

    // console.log("User:", req.user);

    next();
  };
}

function restrictTo(roles){
    return function(req,res, next){
        // console.log(req.user)
        if(!req.user){
            return res.json({message:"Please Log In"})
        }

        if(!roles.includes(req.user.role)){
            return res.status(200).json({message:"You are not authorized to use this functionality"})
        }
         
        next()
    }
}


module.exports = {
    checkToken,
    restrictTo,
}
