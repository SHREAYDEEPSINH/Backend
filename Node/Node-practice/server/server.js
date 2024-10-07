let http = require("http");
let fs = require("fs")


let myServer = http.createServer((req, res) => {
    // console.log("New Request Recived");

    const log = `New Request Recived : ${Date.now()} : ${req.url} \n`


    fs.appendFile("log.txt", log, (err, data) => {

        let url = `${req.url}`
        
        switch (url) {
            case "/user":
                res.end("namste user")
                break;

            case "/about":
                res.end("namste about")
                break;

            case "/team":
                res.end("namste team")
                break;

            default:
                res.end("Page Not Found")
                break;
        }

    })
})

myServer.listen(8000, () => {
    console.log("server started");
})
