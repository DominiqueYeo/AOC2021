let fs = require("fs");

var text = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map((el) => Number(el));
console.log(text);

let windowedInput = [];
for (let i = 0; i < text.length - 2; i += 1) {
  windowedInput.push(text[i] + text[i + 1] + text[i + 2]);
}

console.log(windowedInput);

let prev = Infinity;
const sum = windowedInput.reduce((acc, cur) => {
  acc = cur > prev ? acc + 1 : acc;
  prev = cur;
  return acc;
}, 0);

console.log(sum);
