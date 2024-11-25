const mongoose = require("mongoose");

const connection = async () =>{
        await mongoose.connect("mongodb://localhost:27017/mongoDB_revision")
}

module.exports = connection ;