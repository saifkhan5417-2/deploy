const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email : {type : String , required : true},
    password : {type : String , required : true},
    age : {type : Number , required : true}
})



const UserModel = mongoose.model("users" , userSchema)

module.exports = {
    UserModel
}