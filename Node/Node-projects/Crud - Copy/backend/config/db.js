const mongoose = require("mongoose");

const connection = async () => {
    await mongoose.connect("mongodb://localhost:27017/Crud-Data")
    console.log("db connected")
}

module.exports = connection