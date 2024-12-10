const express = require("express");
const dashboardRouter = require("./routes/dashboardRoutes");
const PORT = 1050;
const path = require("path");
const connection = require("./config/db");
const app =express();

app.set("view engine" , "ejs")
app.set(express.urlencoded())
// app.use(express.static('assets'));

app.use("/assets", express.static(path.join(__dirname, "/assets")));

app.use("/" , dashboardRouter);






app.listen(PORT , (err)=>{
    if(err){
        console.log(err)
    }
    connection()
    console.log(`server start ${PORT}`)
})


