const mongoose = require("mongoose");

const extraProductSchema = mongoose.Schema({
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        require : true,
        ref : "Product"
    },
    subProductId : {
        type : mongoose.Schema.Types.ObjectId,
        require : true,
        ref : "SubProduct"
    },
    extraProductName : {
        type : String,
        required : true, 
    }
})

const ExtraProductModel = mongoose.model("ExtraProduct" , extraProductSchema)

module.exports = ExtraProductModel