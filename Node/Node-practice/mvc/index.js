let express = require("express");
const homeRouter = require("./Routes/home");
const aboutRoter = require("./Routes/about");
let PORT = 9000;
let app = express();

app.set("view engine" , "ejs");

// app.get("/" ,(req,res)=>{
//     res.render("home")
// })
// app.get("/about" ,(req,res)=>{
//     res.render("about")
// })

app.use("/" , homeRouter)
app.use("/" , aboutRoter)


app.listen(PORT , (err)=>{
    if(err){
        console.log(err);
    }
    console.log(`server run ${PORT}`);
    
})