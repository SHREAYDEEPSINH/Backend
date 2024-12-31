const express = require("express");
const userRouter = express.Router()

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");


userRouter.post("/register" , async (req,res)=>{
    try {
        const existEmail = await UserModel.findOne({email : req.body.email})
        if(!existEmail){
            req.body.password = await bcrypt.hash(req.body.password , 10)
            await UserModel.create(req.body)
            res.status(201).json({message : "user register successfully"})
        }else{
            res.status(200).json({message : "this email already exists"})
        }
    } catch (error) {
        res.status(400).json({message : error})
    }
})


userRouter.post("/login" , async (req,res)=>{
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (user) {
          if (await bcrypt.compare(req.body.password, user.password)) {
            const token = jwt.sign({ user }, process.env.SECRET_KEY, {expiresIn: "1h",});

            console.log(token)
            return res.status(200).json({ message: "login Successfully", token , email : user.email});

          } else {
            res.status(400).json({ message: "invalid Password" });
          }
        } else {
          res.status(404).json({ message: "invalid email" });
        }
      } catch (err) {
        console.log(err);
        return res.status(400).json({ message: err });
      }
})


module.exports = userRouter