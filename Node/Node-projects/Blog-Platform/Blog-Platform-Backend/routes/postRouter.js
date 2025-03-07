const express = require("express")
const { protect } = require("../middleware/auth")
const { authorize } = require("../middleware/auth")

const postRouter = express.Router()


postRouter.post("/post", protect , authorize("author" , "admin") , (req,res)=>{
 res.json({message : "post created"})
})

module.exports = postRouter