const express = require("express");
const UserModel = require("../model/UserModel");

const dashboardRouter = express.Router()


dashboardRouter.get("/" , (req , res) =>{
    res.render("dashboard");
})


dashboardRouter.get("/singUp" ,(req , res)=>{
    res.render("singUp")
})

dashboardRouter.get("/singIn" ,(req , res)=>{
    res.render("singIn")
})


dashboardRouter.post("/insertData", UserModel.imageUpload , async (req , res)=>{
    console.log(req.body)
    console.log(req.file)
    try {
        if(req.file){
            req.body.profileImage = UserModel.imagePath + "/" + req.file.filename ;
        }
        await UserModel.create(req.body);
        console.log("user created")
        res.redirect("/singin")
    } catch (error) {
        console.log(error)
    }

})


module.exports = dashboardRouter;