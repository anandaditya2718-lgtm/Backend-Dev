const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

const users = [
    { id: 1, name: "Alice Johnson" },
    { id: 2, name: "Bob Smith" },
    { id: 3, name: "Charlie Brown" },
    { id: 4, name: "Diana Prince" },
    { id: 5, name: "Evan Turner" }
];

app.get("/users", (req, res) => {
    const { name } = req.query;

    if (!name) {
        return res.json({ count: users.length, users });
    }

    const query = String(name).toLowerCase();
    const filtered = users.filter(user => user.name.toLowerCase().includes(query));

    return res.json({ count: filtered.length, users: filtered });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
