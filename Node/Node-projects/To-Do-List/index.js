const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 9000;

// Middleware 

app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")

// Static Array for all Records  // as a database

let records = []


// HOme Route 

app.get("/", (req, res) => {
    return res.render("index", { records });
})

// add Route

app.post("/add", (req, res) => {
    const newRecord = req.body.record;
    records.push(newRecord);
    res.redirect("/")
})


// edit Route

app.post("/edit/:index", (req, res) => {
    const index = req.params.index;
    const editToBe = records[index];
    res.render("edit", { record : editToBe, index })
})

// update Route

app.post("/update/:index", (req, res) => {
    const index = req.params.index;
    records[index] = req.body.record;
    res.redirect("/");
})


// delete Route

app.get("/delete/:index", (req, res) => {
    const index = req.params.index;
    records.splice(index, 1)
    res.redirect("/")
})



// Server linten 

app.listen(PORT, () => {
    console.log("server started" , PORT);
})