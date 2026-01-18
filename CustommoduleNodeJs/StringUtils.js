function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

function reverse(str) {
    return str.split('').reverse().join('');
}

function countVowels(str) {
    let count = 0;
    for (let ch of str) {
        if ("aeiouAEIOU".includes(ch)) count++;
    }
    return count;
}
module.exports = { capitalize, reverse, countVowels };
