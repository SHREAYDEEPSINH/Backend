const mongoose = require("mongoose")

const connection = async (req,res) =>{
    await mongoose.connect("mongodb://localhost:27017/studentData")
    console.log("db connected")
}

module.exports = connection