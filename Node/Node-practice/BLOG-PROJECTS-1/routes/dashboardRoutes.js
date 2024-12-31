const express = require("express");
const dashboardRouter = express.Router()



dashboardRouter.get("/" , (req,res)=>{
    res.render("dashboard")
})

// dashboardRouter.get("/singup" , (req,res)=>{
//     res.render("singup")
// })



module.exports = dashboardRouter