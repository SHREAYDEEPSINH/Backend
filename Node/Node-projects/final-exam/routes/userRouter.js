const express = require("express");
const userRouter = express.Router()

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
const cookieParser = require("cookie-parser");
const taskRouter = require("./taskRouter");
const TaskModel = require("../models/taskModel");


userRouter.get("/", (req, res) => {
  res.render("register")
})

userRouter.get("/login", (req, res) => {
  res.render("login")
})



// task 

userRouter.get("/taskform", (req, res) => {
  res.render("taskForm")
})



userRouter.get("/tasklist", async (req, res) => {
  const userid=req.body.taskId;
  const task = await TaskModel.find({})
  console.log(userid);
  
  res.render("taskList", { task })
})



userRouter.post("/register", async (req, res) => {
  try {
    const existEmail = await UserModel.findOne({ email: req.body.email })
    if (!existEmail) {
      req.body.password = await bcrypt.hash(req.body.password, 10)
      await UserModel.create(req.body)
      res.redirect("/login")
    } else {
      console.log("this email already exists")
    }
  } catch (error) {
    console.log(error)
  }
})


userRouter.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        const token = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: "1h", });

        res.cookie("token", token)
        console.log(token)
        console.log("login done")
        res.redirect("/taskform")
      } else {
        console.log("invalid Password")
      }
    } else {
      console.log("invalid email")
    }
  } catch (err) {
    console.log(err);

  }
})


module.exports = userRouter