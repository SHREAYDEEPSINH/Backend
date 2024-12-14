const express = require("express");
const UserModel = require("../model/userModel");
const dashboardRouter = express.Router()
const path = require("path")
const fs = require("fs")

dashboardRouter.get("/", (req, res) => {
    const cookieData = req.cookies["auth"];
    if (cookieData) {
        res.redirect("/dashboard");
        return;
    }
    res.render("signin");
})

dashboardRouter.get("/dashboard", (req, res) => {
    const cookieData = req.cookies["auth"];
    if (!cookieData) {
        res.redirect("/");
        return;
    }
    res.render("dashboard" , {cookieData});
})

dashboardRouter.get("/signup", (req, res) => {
    res.render("signup")
})



dashboardRouter.post("/insertData", UserModel.imageUpload ,async (req, res) => {
    try {
        if(req.file){
            req.body.image = UserModel.imagePath + "/" + req.file.filename;
        }
        await UserModel.create(req.body);
        console.log("user created")
        res.redirect("/")
    } catch (error) {
        console.log(error)
    }
})


dashboardRouter.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const getUserData = await UserModel.findOne({ username: username });
    if (getUserData) {
        if (getUserData.password !== password) {
            console.log("Invalid credentials");
            res.redirect("/");
            return;
        }
    } else {
        console.log("User not found");
        res.redirect("/");
        return;
    }
    res.cookie("auth", getUserData);
    res.redirect("/dashboard");

    console.log(getUserData , "getUser");
});


dashboardRouter.get("/tables", async (req, res) => {
    // res.render("tables")
    const userdata=await UserModel.find({});
    const cookieData = req.cookies["auth"];
    
    if (!cookieData) {
        res.redirect("/")
        return;
    }
    res.render("tables" ,{userdata,cookieData});
})


dashboardRouter.get("/logOut" ,(req , res)=>{
    res.clearCookie("auth")
    res.redirect("/")
 })
 

module.exports = dashboardRouter

