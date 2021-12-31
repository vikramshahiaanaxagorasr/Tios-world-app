let jwt = require('jsonwebtoken');
const userModel=require('../models/User');
module.exports = {
    isLoggedIn: async function (req, res, next)
    {
        try
        {
            let token = req.headers.authorization;

            if (!token)
            {
                return res.status(400).json({ error: 'user must be logged in' });
            } else
            {
                let profileData = await jwt.verify(token, process.env.TOKEN_KEY);
                const user=await userModel.findById(profileData.userID)
                req.user = user;
                next();
            }
        } catch (error)
        {
            next(error);
        }
    },

    authRole:function(req,res,next){
        if(req.user.type==='admin'){
            next();
        }
        else{
            return res.status(403).json({message:`role: ${req.user.type} is not allowed to access this resource`,success:false})
        }
    }
};