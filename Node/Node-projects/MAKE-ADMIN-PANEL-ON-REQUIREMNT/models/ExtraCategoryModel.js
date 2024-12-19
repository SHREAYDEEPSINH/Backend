const mongoose = require("mongoose");

const extraCategorySchema = mongoose.Schema({
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        require : true,
        ref : "Category"
    },
    subCategoryId : {
        type : mongoose.Schema.Types.ObjectId,
        require : true,
        ref : "SubCategory"
    },
    extraCategoryName : {
        type : String,
        required : true, 
    }
})

const ExtraCategoryModel = mongoose.model("ExtraCategory" , extraCategorySchema)

module.exports = ExtraCategoryModel