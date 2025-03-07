let express = require("express")
const connection = require("./config/db")
const { configDotenv } = require("dotenv")
const userRouter = require("./routes/userRouter")
const postRouter = require("./routes/postRouter")

configDotenv()
let app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use("/user" , userRouter)
app.use("/" , postRouter)


app.listen(process.env.PORT, (error) => {
    if (error) {
        alert(error)
    } else {
        console.log(`server run on ${process.env.PORT}`)
        connection()
    }
})