const mongoose = require("mongoose")

const connection = async (req,res) =>{
   await mongoose.connect("mongodb://127.0.0.1/adminPanel");
}

module.exports = connection;