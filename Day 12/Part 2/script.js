let fs = require("fs");

let text = fs
  .readFileSync("test.txt", "utf8")
  .split("\r\n")
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
    console.log(node, visitObj);
    noOfPaths += 1;
    return;
  }
  let length = Object.keys(visitObj).filter(
    (el) => el === el.toLowerCase() && visitObj[el] >= 2
  ).length;

  let smallCaveMax = length > 0 ? 1 : 2;
  if (
    !mappings[node].some(
      (el) => el === el.toLowerCase() && visitObj[el] < smallCaveMax
    )
  ) {
    //check if it is a dead end
    return;
  }

  // if (
  //   smallCaveMax === 2 &&
  //   mappings[node].some((el) => el === el.toLowerCase() && visitObj[el]  >=2) &&
  //   mappings[node].every((el) => el === el.toLowerCase() && visitObj[el] >= 1)
  // ) {
  //   return;
  // }

  let isVisitedClone = { ...visitObj };
  isVisitedClone[node] = isVisitedClone[node] + 1;
  mappings[node].forEach((path) => {
    if (path !== "start") {
      if (path === path.toUpperCase() || isVisitedClone[path] < smallCaveMax) {
        findPath(path, isVisitedClone);
      }
    }
  });
};

findPath("start", isVisited);
console.log(noOfPaths);
