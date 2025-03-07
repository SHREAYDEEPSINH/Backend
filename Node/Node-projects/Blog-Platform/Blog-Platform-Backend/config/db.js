let mongoose = require("mongoose")


let connection = async () => {
    await mongoose.connect("mongodb://localhost:27017/blog-platform")
    console.log("db connected")
}

module.exports = connection