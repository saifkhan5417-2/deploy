const express = require("express");
const {userController} = require("./routes/user.routes")
const {blogController} = require("./routes/blog.routes")
const app = express();
const PORT = "8080"
const connection = require("./db");
const { authentication } = require("./middelwares/authentication");
var cors = require('cors')
 
app.use(cors())
app.use(express.json());
app.use("/user", userController)
app.use(authentication)
app.use("/blog", blogController)
app.listen(PORT, async()=>{
    try {
        await connection
        console.log("connect to db");
    } catch (error) {
        console.log(error);
    }
    console.log(`your port are listning at ${PORT}`);
})