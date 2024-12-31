const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    taskId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    taskName : {
        type : String,
        required : true
    }
})

const TaskModel = mongoose.model("Task" , taskSchema);

module.exports = TaskModel;