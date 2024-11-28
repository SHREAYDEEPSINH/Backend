const express = require("express");

const PORT = 1000;

const app = express();





app.listen(PORT , (err)=>{
    if(err){
        console.log(err)
    }

})