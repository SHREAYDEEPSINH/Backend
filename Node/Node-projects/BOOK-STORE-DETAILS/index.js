let express = require("express");
let connection = require("./config/db")
let UserModel = require("./model/UserModel")
let PORT = 8000 ;

let app = express()

app.set("view engine" , "ejs");
app.use(express.urlencoded());

app.get("/" , async (req , res)=>{

    try {
        const userData =await UserModel.find({});

        res.render("addData" , {userData})
    } catch (error) {
        console.log(error)
    }
})

app.post("/insertAddData" , async (req ,res)=>{
    try {
        await UserModel.create(req.body);
        console.log("data added successfully");

    } catch (error) {
        console.log(error);
    }
    res.redirect("back")
})


app.get("/deleteData/:id" , async (req ,res)=>{
    console.log(req.params.id)

    await UserModel.findByIdAndDelete(req.params.id);
    console.log("data deleted successfully");

    res.redirect("back")
})


app.get("/editData/:id" , async (req,res)=>{

    let storeData = await UserModel.findById(req.params.id);
    console.log(storeData);

    res.render("editData" , {storeData});
})


app.post("/updateData/:id" ,async (req,res) =>{

    try {
        await UserModel.findByIdAndUpdate(req.params.id, req.body);
        console.log("Data updated successfully");
        res.redirect("/");
    } catch (err) {
        console.log(err);
    }
})


app.listen(PORT , (err)=>{
    if(err){
        console.log("server not running");
        return;
    }
    connection();
    console.log(`server running on port ${PORT}`)
})

