'use strict';

const fs = require('fs');

const fileContent = fs.readFileSync('top-10000-passwords.txt', 'utf-8');
const listOfStupidPasswords = fileContent.split(/\n/g).map(value => {
  const parts = value.split(',')
  return {
    password: parts[0],
    frequency: parseInt(parts[1], 10)
  }
});

fs.writeFile("./stupidPasswords.js", [
  'module.exports = ',
  JSON.stringify(listOfStupidPasswords),
  ';',
].join(''), function(err) {
  if (err) return console.log(err);
  console.log("The file was saved!");
});
