const express = require("express");
const StudentModel = require("../model/studentModel");
const bcrypt = require("bcrypt")

const studentRouter = express.Router()

studentRouter.get("/", async (req, res) => {
    try {
        let getStudentData = await StudentModel.find({})
        res.status(200).json({ studentData: getStudentData });
    } catch (error) {
        res.status(400).json({ error: err.message });
    }
})

studentRouter.post("/addStudent", async (req, res) => {
    try {

        req.body.password = await bcrypt.hash(req.body.password,10)
        await StudentModel.create(req.body)
        res.status(201).json({ message: "Student added successfully" });
    } catch (error) {
        res.status(400).json({ error: err.message });
    }
})


studentRouter.delete("/deleteStudent/:id", async (req, res) => {
    try {
        await StudentModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Student Deleted" })
    } catch (error) {
        res.status(400).json({ error: err.message });
    }
})

studentRouter.put("/updateStudent/:id", async (req, res) => {
    try {
        await StudentModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({ message: "Student updated" })
    } catch (error) {
        res.status(400).json({ error: err.message });
    }
})

module.exports = studentRouter