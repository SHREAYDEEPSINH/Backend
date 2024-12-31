const mongoose = require("mongoose");

const connection = async () => {
    await mongoose.connect("mongodb://localhost:27017/final-exam-data")
    console.log("db connected")
}

module.exports = connection