let fs = require("fs");

var text = fs.readFileSync("input.txt", "utf8").split("\n");

let checker = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

for (let i = 0; i < text.length; i += 1) {
  for (let j = 0; j < checker.length; j += 1) {
    let val = text[i][j] === "1" ? 1 : -1;
    checker[j] += val;
  }
}

let rawBin = checker.map((el) => (el > 0 ? 1 : 0));
let gamma = parseInt(rawBin.join(""), 2);
let rawBinE = checker.map((el) => (el > 0 ? 0 : 1));
let epsilon = parseInt(rawBinE.join(""), 2);
console.log(gamma * epsilon);
let oxyArr = [...text];
let co2Arr = [...text];

let index = 0;
const findOxy = (arr) => {
  if (arr.length === 1) {
    return arr[0];
  }
  let oneChecker = 0;
  for (let i = 0; i < arr.length; i += 1) {
    let val = arr[i][index] === "1" ? 1 : -1;
    oneChecker += val;
  }
  let holding = oneChecker >= 0 ? 1 : 0;
  arr = arr.filter((bin) => bin[index] == holding);
  console.log(arr);
  index += 1;
  return findOxy(arr);
};
let carbonIndex = 0;
const findCarbon = (arr) => {
  if (arr.length === 1) {
    return arr[0];
  }
  let oneChecker = 0;
  for (let i = 0; i < arr.length; i += 1) {
    let val = arr[i][carbonIndex] === "1" ? 1 : -1;
    oneChecker += val;
  }
  let holding = oneChecker >= 0 ? 0 : 1;
  arr = arr.filter((bin) => bin[carbonIndex] == holding);
  carbonIndex += 1;
  return findCarbon(arr);
};
//console.log(parseInt(findOxy(oxyArr), 2));
//console.log(parseInt(findCarbon(co2Arr), 2));
console.log(parseInt(findOxy(oxyArr), 2) * parseInt(findCarbon(co2Arr), 2));
