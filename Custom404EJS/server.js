const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
    res.send("Home page is working. Try a random route to see 404.");
});

app.get("/about", (req, res) => {
    res.send("About page");
});

app.use((req, res) => {
    res.status(404).render("404", { url: req.originalUrl });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
