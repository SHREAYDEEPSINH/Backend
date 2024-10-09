let express = require("express");
let app = express();
let port = 3000 ;


app.get("/" , (req ,res) =>{
   res.send("hello")
})


app.listen(port , ()=>{
    console.log("express started");
})

