const express = require("express");
const dashboardRouter = require("./routes/dashboardRoutes");
const connection = require("./config/db");
var cookieParser = require('cookie-parser')
var session = require('express-session')
const passport = require("passport");
const passportLocal = require("./config/passport-local")
const PORT = 6050;
const app = express();

const path = require("path");


app.set("view engine" , "ejs");

app.use("/assets" ,express.static(path.join(__dirname , "/assets")));
app.use("/uploads" ,express.static(path.join(__dirname , "/uploads")));


app.use(express.urlencoded())
app.use(cookieParser())
app.use(session({
    secret: 'nodeAdmin',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge:1000*60*60}
}));
app.use(passport.initialize());
app.use(passport.session())

app.use("/" , dashboardRouter);

app.listen(PORT , (err)=>{
    if(err){
    console.log("Error")
    return ;
    }
    connection()
    console.log(`server run ${PORT}`)
})

