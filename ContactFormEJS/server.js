const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.render("contact", { error: null });
});

app.post("/submit-contact", (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
        return res.render("contact", { error: "All fields except subject are required!" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.render("contact", { error: "Please enter a valid email address!" });
    }

    console.log("Contact Form Submission:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Subject:", subject || "No subject");
    console.log("Message:", message);
    console.log("----------------------------");

    res.render("success", { name, email, subject, message });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
