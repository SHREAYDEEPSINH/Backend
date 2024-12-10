const express = require("express");
const UserModel = require("../model/UserModel");
const dashboardRouter = express.Router()



dashboardRouter.get("/dashboard", (req, res) => {
    res.render("dashboard")
})

dashboardRouter.get("/signup", (req, res) => {
    res.render("signup")
})

dashboardRouter.get("/", (req, res) => {
    res.render("signin")
})

dashboardRouter.post("/insertData", async (req, res) => {
    console.log(req.body)
    try {
        await UserModel.create(req.body);
        console.log("user created")
        // res.redirect("/")
    } catch (error) {
        console.log(error)
    }
})


module.exports = dashboardRouter