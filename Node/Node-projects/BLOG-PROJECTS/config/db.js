const mongoose = require("mongoose");


const connection = async () =>{
    await  mongoose.connect("mongodb://127.0.0.1/Blog-admin-panel")
    console.log("db connected")
}

module.exports = connection;