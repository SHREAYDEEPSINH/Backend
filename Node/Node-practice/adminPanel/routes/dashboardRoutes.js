const express = require("express");
const UserModel = require("../model/UserModel");
const passport = require("passport");
const dashboardRouter = express.Router()


dashboardRouter.get("/" , async (req , res) =>{
    // const cookieData = req.cookies["auth"];
    // if(cookieData){
    //     res.redirect("/dashboard");
    //     return;
    // }
    res.render("singIn");
})


dashboardRouter.get("/singUp" ,(req , res)=>{
    res.render("singUp")
})

dashboardRouter.get("/dashboard" ,(req , res)=>{
    // const cookieData = req.cookies["auth"];
    // if(!cookieData){
    //     res.redirect("/");
    //     return;
    // }
    res.render("dashboard")
})

dashboardRouter.get("/table" ,async (req , res)=>{
    const userData = await UserModel.find({})
    // const cookieData = req.cookies["auth"];
    // if(!cookieData){
    //     res.redirect("/");
    //     return;
    // }
    res.render("table" , {userData})
})



dashboardRouter.post("/insertData", UserModel.imageUpload , async (req , res)=>{
    // console.log(req.body)
    // console.log(req.file)
    try {
        if(req.file){
            req.body.profileImage = UserModel.imagePath + "/" + req.file.filename ;
        }
        await UserModel.create(req.body);
        console.log("user created")
        res.redirect("/")
    } catch (error) {
        console.log(error)
    }

})



dashboardRouter.get("/changepassword" ,(req , res)=>{
    res.render("changepassword")
})

dashboardRouter.post("/newpassword" , async(req , res)=>{
    // const cookieData = req.cookies["auth"];
    // if(!cookieData){
    //     res.redirect("/");
    //     return;
    // } else{
    //     if (req.body.oldpassword === cookieData.password) {
    //         if (req.body.newpassword !== req.body.oldpassword) {
    //             if (req.body.confirmpassword === req.body.newpassword) {
    //                 console.log(cookieData._id);
    //                 await UserModel.findByIdAndUpdate(cookieData._id,{ password: req.body.newpassword })
    //                 console.log("password changed")
    //                 await res.clearCookie("auth");
    //                 await res.redirect("/");
    //             } else { res.redirect("back") }
    //         } else { res.redirect("back") }
    //     } else { res.redirect("back") }
    // }
})


dashboardRouter.get("/logOut" ,(req , res)=>{
   res.clearCookie("auth")
   res.redirect("/")
})


dashboardRouter.post("/logIn" , passport.authenticate("local" ,{failureRedirect :"/"}) ,(req,res)=>{
    // const {username , password} = req.body ;
    // const getData = await UserModel.findOne({username})

    // if(getData){
    //     if(getData.password !== password){
    //         console.log("invalid password")
    //         res.redirect("/")
    //         return;
    //     }
    // }else{
    //     console.log("user not found")
    //     res.redirect("/");
    //     return;
    // }

    // res.cookie("auth",getData)
    return res.redirect("/dashboard")

})


module.exports = dashboardRouter;