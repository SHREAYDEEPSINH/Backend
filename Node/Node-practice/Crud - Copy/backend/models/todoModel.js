const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    todoId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    todoName : {
        type : String,
        required : true
    }
})

const TodoModel = mongoose.model("Todo" , todoSchema);

module.exports = TodoModel;