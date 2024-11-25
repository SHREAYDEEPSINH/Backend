const express = require("express");

const aboutRoter = express.Router();

aboutRoter.get("/about" ,(req,res)=>{
    res.render("about")
})

module.exports = aboutRoter 