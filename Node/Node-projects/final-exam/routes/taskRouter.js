const express = require("express");
const auth = require("../middleware/auth");
const TaskModel = require("../models/taskModel");
const taskRouter = express.Router();



taskRouter.get("/", async (req, res) => {
    try {
        const userId = req.body.taskId;

        const tasks = await TaskModel.find({ taskId: userId });
        console.log("tasks", tasks)
        res.status(200).json({ tasks });
    } catch (error) {
        console.error(error);
    }
});

taskRouter.post("/addTask", async (req, res) => {
    try {
        const newTask = new TaskModel({
            taskId: req.body.taskId,
            taskName: req.body.taskName,
        });

        await TaskModel.create(newTask)
        console.log("Task added successfully")
        res.redirect("/tasklist")
    } catch (error) {
        console.error(error);
    }
});


taskRouter.get("/deleteTask/:id", async (req, res) => {
    try {
        await TaskModel.findByIdAndDelete(req.params.id);
        res.redirect("back")
        console.log("task deleted successfully")
    } catch (error) {
        console.log(error)
    }
})

// taskRouter.get("/editTask/:id" , async (req,res)=>{
//     try {
//         await TaskModel.findByIdAndUpdate(req.params.id, req.body);
//         console.log("task edited successfully")
//     } catch (error) {
//         console.log(error)
//     }
// })

taskRouter.get("/editTask/:id", async (req, res) => {
    const storeData = await TaskModel.findById(req.params.id);
    console.log(storeData);
    res.render("editData", { storeData });
});

taskRouter.post("/updateData/:id", async (req, res) => {
    try {
        await TaskModel.findByIdAndUpdate(req.params.id, req.body);
        console.log("Data updated successfully");
        res.redirect("/tasklist");
    } catch (err) {
        console.log(err);
    }
});

module.exports = taskRouter

