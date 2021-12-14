let fs = require("fs");

let text = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map((el) => el.split("-"));

let mappings = {};

text.forEach((edge) => {
  if (!mappings[edge[0]]) {
    mappings[edge[0]] = [];
  }
  if (!mappings[edge[1]]) {
    mappings[edge[1]] = [];
  }
  mappings[edge[0]].push(edge[1]);
  mappings[edge[1]].push(edge[0]);
});

let noOfPaths = 0;
let isVisited = {};
text.flat().forEach((el) => {
  if (!isVisited[el]) isVisited[el] = 0;
});
console.log(mappings);
// console.log(isVisited);
const findPath = (node, visitObj) => {
  if (node === "end") {
    noOfPaths += 1;
    return;
  }
  if (
    mappings[node].every((el) => el === el.toLowerCase() && visitObj[el] >= 1)
  ) {
    //check if it is a dead end
    return;
  }
  let isVisitedClone = { ...visitObj };
  isVisitedClone[node] = isVisitedClone[node] + 1;
  mappings[node].forEach((path) => {
    if (path === path.toUpperCase() || isVisitedClone[path] === 0) {
      findPath(path, isVisitedClone);
    }
  });
};

findPath("start", isVisited);
console.log(noOfPaths);
