const express = require("express");
const dashboardRouter = require("./routes/dashboardRoutes");
const connection = require("./config/db");

const PORT = 5000;
const app = express();

const path = require("path");


app.set("view engine" , "ejs");
app.use(express.urlencoded())

app.use("/" , dashboardRouter);

app.use("/assets" ,express.static(path.join(__dirname , "/assets")));



app.listen(PORT , (err)=>{
    if(err){
    console.log("Error")
    return ;
    }
    connection()
    console.log(`server run ${PORT}`)
})

