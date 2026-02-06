const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

let posts = [
    { id: 1, title: "Welcome to the Blog", content: "This is your first post." },
    { id: 2, title: "Second Post", content: "You can add more posts using the form." }
];
let nextId = 3;

app.get("/", (req, res) => {
    res.redirect("/posts");
});

app.get("/posts", (req, res) => {
    res.render("index", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new", { error: null, values: { title: "", content: "" } });
});

app.post("/posts", (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.render("new", {
            error: "Title and content are required.",
            values: { title: title || "", content: content || "" }
        });
    }

    posts.unshift({ id: nextId++, title: title.trim(), content: content.trim() });
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    const postId = Number(req.params.id);
    const post = posts.find(p => p.id === postId);

    if (!post) {
        return res.status(404).render("not-found", { id: req.params.id });
    }

    res.render("show", { post });
});

app.use((req, res) => {
    res.status(404).render("not-found", { id: null });
});

app.listen(port, () => {
    console.log(`Blog running at http://localhost:${port}`);
});
