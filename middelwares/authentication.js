const jwt = require("jsonwebtoken")
require("dotenv").config()
const authentication = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]
    console.log(token);
    if(!token){
        res.send("Login first")
    }
    else{
        jwt.verify(token, process.env.JWT, function(err, decoded){
            if(err){
                res.send("Login first")
            }                 
            else{
                req.body.userId = decoded.userId
                next()
            }
        })
    }
}
module.exports={
    authentication
}