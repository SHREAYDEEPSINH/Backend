const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    productName : {
        type : String,
        required : true, 
    }
})

const ProductModel = mongoose.model("Product" , productSchema)

module.exports = ProductModel