const fs = require("fs");

const cmd = process.argv[2];
const a = process.argv[3];
const b = process.argv[4];

if (cmd === "read") {
    fs.readFile(a, "utf8", (e, d) => {
        if (e) {
            console.log("Error");
            return;
        }
        console.log(d);
    });
} 
else if (cmd === "write") {
    fs.writeFile(a, b || "", (e) => {
        if (e) {
            console.log("Error");
            return;
        }
        console.log("Done");
    });
} 
else if (cmd === "copy") {
    fs.copyFile(a, b, (e) => {
        if (e) {
            console.log("Error");
            return;
        }
        console.log("Done");
    });
} 
else if (cmd === "delete") {
    fs.unlink(a, (e) => {
        if (e) {
            console.log("Error");
            return;
        }
        console.log("Done");
    });
} 
else if (cmd === "list") {
    fs.readdir(a || ".", (e, f) => {
        if (e) {
            console.log("Error");
            return;
        }
        f.forEach(x => console.log(x));
    });
} 
else {
    console.log("Invalid command");
}
