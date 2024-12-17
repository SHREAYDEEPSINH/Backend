const express = require("express");
const dashboardRouter = require("./routes/dashboardRouter");
const path = require("path");
const connection = require("./config/db");
const passport = require("passport");
const PORT = 3000;
const app =express()
const cookieParser = require("cookie-parser");
app.set("view engine" , "ejs")
app.use(express.urlencoded())

app.use("/assets" , express.static(path.join(__dirname , "/assets")))
app.use("/uploads" , express.static(path.join(__dirname , "uploads")))
app.use(require('express-session')({ secret: 'node admin', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUser);
app.use(cookieParser());

app.use("/", dashboardRouter)

app.listen(PORT , (err)=>{
    if(err){
        console.log(err)
    }
    connection()
    console.log(`server started on ${PORT}`)
})
