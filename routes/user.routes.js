const {Router} = require("express");
const bcrypt = require('bcrypt');
const { UserModel } = require("../models/User.model");
const userController = Router();
var jwt = require('jsonwebtoken');
require("dotenv").config()


userController.post("/signup",(req,res)=>{
    const {email,password,age} = req.body;
    bcrypt.hash(password, 4, async function(err, hash) {
        if(err){
            res.send("signup went wrong")
        }else{
            const user = new UserModel({
                email,
                password : hash,
                age,
            })
            try {
                await user.save();
                res.send("user added");
            } catch (error) {
                console.log(error);
            }
        }
    });
})

userController.post("/login", async(req,res)=>{
    const {email , password} = req.body;
    const user = await UserModel.findOne({email})
    const hash = user.password
    bcrypt.compare(password, hash, function(err, result) {
        if(result){
            var token = jwt.sign({ userId : user._id }, process.env.JWT);
            res.send({msg:"you are Login", token})     
           }else{
            console.log(err);
        }
    });
})

module.exports = {
    userController
}