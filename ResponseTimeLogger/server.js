const express = require("express");
const responseTimeLogger = require("./responseTimeMiddleware");

const app = express();
const port = process.env.PORT || 3000;

app.use(responseTimeLogger);

app.get("/", (req, res) => {
    res.send("Welcome to the API!");
});

app.get("/slow", (req, res) => {
    setTimeout(() => {
        res.send("This was a slow response");
    }, 2000);
});

app.get("/fast", (req, res) => {
    res.send("This was a fast response");
});

app.get("/users", (req, res) => {
    const users = [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" }
    ];
    res.json(users);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log("Response time logging enabled");
});
