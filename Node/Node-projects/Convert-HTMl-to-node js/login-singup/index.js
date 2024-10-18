const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const PORT = 8000;

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

const users = [];

// Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "signup.html"));
});

// Handle signup
app.post("/signup", (req, res) => {
    const { username, email, password } = req.body;


    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.send("User already exists.");
    }


    users.push({ username, email, password });
    res.redirect("/login")

});

// Handle login
app.post("/login", (req, res) => {
    const { email, password } = req.body;


    const user = users.find(user => user.email === email);
    if (!user) {
        return res.send("Please sign up first");

    }

    if (user.password !== password) {
        return res.send("Incorrect password");
    }

    res.redirect("/")
});


app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
