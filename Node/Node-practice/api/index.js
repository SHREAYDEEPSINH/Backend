const express = require("express");
const studentRouter = require("./routes/studentRoutes");
const cors = require("cors")
const connection = require("./config/db");
const PORT = 8080;

const app = express();

app.use(cors())
app.use(express.urlencoded())
app.use("/" , studentRouter)


app.listen(PORT , (error) =>{
    if(error){
        console.log(error)
    }
    connection()
    console.log(`server started ${PORT}`)
})