const express = require("express");
const connection = require("./config/db");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRouter");
const auth = require("./middleware/auth");
const cookieParser = require("cookie-parser");
const taskRouter = require("./routes/taskRouter");

dotenv.config()
const app = express()
app.use(express.json())
app.use(cookieParser())

app.set("view engine" , "ejs")
app.use(express.urlencoded({ extended: true })) 


app.use("/" , userRouter)
app.use(auth)
app.use("/task" , taskRouter)



app.listen(process.env.PORT , (error)=>{
    if(error){
        console.log(error)
    }
    else{
        connection()
        console.log(`server run on ${process.env.PORT}`)
    }
})