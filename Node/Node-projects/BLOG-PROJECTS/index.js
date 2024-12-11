const express = require("express");
const dashboardRouter = require("./routes/dashboardRoutes");
const PORT = 1050;
const path = require("path");
const connection = require("./config/db");
const cookieParser = require("cookie-parser");
const app =express();
const fs = require("fs");


app.set("view engine" , "ejs")
app.use(express.urlencoded())

app.use("/assets", express.static(path.join(__dirname, "/assets")));
app.use("/uploads" , express.static(path.join(__dirname, "uploads")))

app.use(cookieParser())
    
app.use("/" , dashboardRouter);


app.listen(PORT , (err)=>{
    if(err){
        console.log(err)
    }
    connection()
    console.log(`server start ${PORT}`)
})

