const mongoose = require("mongoose");

const subProductSchema = mongoose.Schema({
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        require : true,
        ref : "Product"
    },

    subProductName : {
        type : String,
        required : true, 
    }
})

const SubProductModel = mongoose.model("SubProduct" , subProductSchema)

module.exports = SubProductModel