const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

const imagesDir = path.join(__dirname, "public", "images");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

const allowedExt = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp"]);

app.get("/", (req, res) => {
    fs.readdir(imagesDir, (err, files) => {
        if (err) {
            return res.render("gallery", { images: [], error: "Images folder not found." });
        }

        const images = files
            .filter(file => allowedExt.has(path.extname(file).toLowerCase()))
            .map(file => `/images/${file}`);

        res.render("gallery", { images, error: null });
    });
});

app.listen(port, () => {
    console.log(`Gallery running at http://localhost:${port}`);
});
