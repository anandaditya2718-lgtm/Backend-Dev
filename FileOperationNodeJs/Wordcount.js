const fs = require('fs');

// input and output file names
const inputFile = 'input.txt';
const outputFile = 'output.txt';

// read file
fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    // count words
    const words = data.trim().split(/\s+/);
    const wordCount = data.trim() === '' ? 0 : words.length;

    // write result to new file
    fs.writeFile(outputFile, `Word Count: ${wordCount}`, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('Word count written to output.txt');
    });
});
