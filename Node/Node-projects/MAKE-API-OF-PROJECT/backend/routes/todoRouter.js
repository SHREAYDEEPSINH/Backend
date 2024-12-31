const express = require("express");
const UserModel = require("../models/userModel");
const TodoModel = require("../models/todoModel");
const auth = require("../middleware/auth");
const todoRouter = express.Router();


todoRouter.get("/", auth, async (req, res) => {
    try {
      // `auth` middleware se `req.body.todoId` me userId aa raha hoga
      const userId = req.body.todoId;
  
      // Find todos for the logged-in user
      const todos = await TodoModel.find({todoId : userId});
        console.log("todos" , todos)
      res.status(200).json({ todos });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch todos", error: error.message });
    }
  });

todoRouter.post("/addTodo", auth, async (req, res) => {
    try {
        const newTodo = new TodoModel({
            todoId: req.body.todoId,
            todoName: req.body.todoName,
        });

        await TodoModel.create(newTodo)
        res.status(201).json({ message: "Todo added successfully", newTodo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add todo", error: error.message });
    }
});


todoRouter.delete("/deleteTodo/:id" , async (req,res)=>{
    try {
        await TodoModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "todo deletes successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

todoRouter.put("/editTodo/:id" , async (req,res)=>{
    try {
        await TodoModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({ message: "todo edited successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

module.exports = todoRouter

