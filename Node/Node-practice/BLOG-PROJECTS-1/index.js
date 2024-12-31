const express = require("express");
const dashboardRouter = require("./routes/dashboardRoutes");
const PORT = 1030;

const app =express();

app.set("view engine" , "ejs")
app.use(express.static('public'));


app.use("/" , dashboardRouter);
app.set(express.urlencoded())



app.listen(PORT , (err)=>{
    if(err){
        console.log(err)
    }
    console.log(`server start ${PORT}`)
})


