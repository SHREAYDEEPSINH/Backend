const express = require("express");
const connection = require("./config/db");
const UserModel = require("./model/userModel");
let port = 8080;
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded());

app.get("/", async (req, res) => {
    try {
        const userData = await UserModel.find({});

        res.render("addData", { userData });
    } catch (err) {
        console.log(err);
    }
});

app.post("/insertAddData", async (req, res) => {
    // console.log(req.body);
    // const { userName, password } = req.body;
    // console.log(userName, password);
    try {
        await UserModel.create(req.body);
        console.log("Data inserted successfully");
    } catch (err) {
        console.log(err);
    }

    res.redirect("back");
});

app.get("/deleteData/:id", async (req, res) => {
    console.log(req.params.id);

    await UserModel.findByIdAndDelete(req.params.id);
    console.log("Data deleted successfully");
    res.redirect("back");
});


app.get("/update/:id", async (req, res) => {
    const storeData = await UserModel.findById(req.params.id);
    console.log(storeData);
    res.render("updateData", { storeData });
});

app.post("/editData/:id", async (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    try {
        await UserModel.findByIdAndUpdate(req.params.id, req.body);
        console.log("Data updated successfully");
        res.redirect("/");
    } catch (err) {
        console.log(err);
    }
});

app.listen(port, (error) => {
    if (error) {
        console.log("server is not running");
        return;
    }
    connection();
    console.log(`Server is running on port ${port}`);
});