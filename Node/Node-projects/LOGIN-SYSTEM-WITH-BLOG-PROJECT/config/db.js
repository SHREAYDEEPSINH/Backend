const mongoose = require("mongoose");

const connection = async ()=>{
    await mongoose.connect("mongodb://127.0.0.1/Login-system-project-data")
    console.log("db connected")
}

module.exports = connection

