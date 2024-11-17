const mongoose = require("mongoose");
const { type } = require("os");

const userSchema = mongoose.Schema({
    bookname : {
        type : String,
        required : true,
    },
    price : {
        type : String,
        required : true,
    },
    section : {
        type : String,
        required : true,
    },
    Category : {
        type : String,
        required : true,
    }

})

const userModel =mongoose.model("userDatabase" ,userSchema);

module.exports = userModel;