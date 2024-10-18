const express = require("express");
const path = require("path")
const app = express();
const PORT = 8000;


// middlwear 

app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => {
    //  res.end("namaste")
    res.sendFile(path.join(__dirname, "public", "index.html"))
})

app.listen(PORT, () => {
    console.log("server started");
})

