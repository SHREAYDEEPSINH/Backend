const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  category:{type: 'string',required: true}
});

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;