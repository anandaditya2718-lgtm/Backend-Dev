const fs = require("fs");
const readline = require("readline");

const file = process.argv[2];

if (!file) {
    console.log("Provide log file");
    process.exit(1);
}

let total = 0;
let error = 0;
let warn = 0;
let info = 0;

const stream = fs.createReadStream(file);

const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
});

rl.on("line", (line) => {
    total++;
    const l = line.toLowerCase();
    if (l.includes("error")) error++;
    else if (l.includes("warn")) warn++;
    else if (l.includes("info")) info++;
});

rl.on("close", () => {
    console.log("Log Summary");
    console.log("Total Lines:", total);
    console.log("Errors:", error);
    console.log("Warnings:", warn);
    console.log("Info:", info);
});
