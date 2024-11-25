const express = require("express");
const connection = require("./config/db");
const UserModel = require("./model/userData");
const PORT = 9000;

let app = express()

app.set("view engine" , "ejs");
app.use(express.urlencoded());

app.get("/" , async (req , res)=>{
    try {
        let userData = await UserModel.find({})
        res.render("addData" , {userData})
    } catch (error) {
        console.log(error)
    }
})

app.post("/insertData" , async (req ,res)=>{
    try {
        await UserModel.create(req.body)
    } catch (error) {
        console.log(error)
    }
    res.redirect("back")
})




app.listen(PORT , (err)=>{
    if(err){
        console.log(err);
        return 
    }
    connection()
    console.log(`server is running ${PORT}`)
})