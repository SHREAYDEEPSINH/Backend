const express = require("express");
const connection = require("./config/db");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRouter");
const auth = require("./middleware/auth");
const todoRouter = require("./routes/todoRouter");
const cors = require("cors")

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

app.use(express.urlencoded({ extended: true })) 

app.use("/user" , userRouter)
app.use(auth)
app.use("/todo" , todoRouter)



app.listen(process.env.PORT , (error)=>{
    if(error){
        console.log(error)
    }
    else{
        connection()
        console.log(`server run on ${process.env.PORT}`)
    }
})