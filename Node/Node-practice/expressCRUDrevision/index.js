const express = require("express");
const bodyParser= require("body-parser")

const app=express();
const PORT=4000;



let records = []

app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine", "ejs")


// home Route 

app.get("/" ,(req,res)=>{
    return res.render("index" , {records});
    
})



// add Route 

app.post("/add" , (req,res)=>{
    const newRecord=req.body.record;
    records.push(newRecord);
    res.redirect("/")
})


// edit Route

app.post("/edit/:index" , (req,res)=>{
    const  index = req.params.index;
    const editToBe = records[index]
    res.render("edit" , {record : editToBe , index})
})


// update Route

app.post("/update/:index" , (req,res)=>{
    const index = req.params.index;
    records[index] = req.body.record;
    res.redirect("/")
})


// delete Route

app.get("/delete/:index" , (req ,res)=>{
    const index=req.params.index;
    records.splice(index , 1);
    res.redirect("/")
})


// server listen 

app.listen(PORT , () => {
    console.log("server started");
})