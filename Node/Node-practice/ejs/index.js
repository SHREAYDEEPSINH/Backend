let express=require("express");
let app=express();
let port=4000;


app.set("view engine", "ejs")

app.get("/" ,(req, res)=>{
    return res.render("index")
})

app.get("/home" ,(req, res)=>{
    return res.render("home")
})

app.use((req, res)=>{
    return res.status(404).render("404")
})

app.listen(port , ()=>{
    console.log(`Server is Running on PORT : ${port}`);
    
})