let fs = require("fs");

let text = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .filter((el) => el != "");
// function to split array into boards
const array_chunks = (array, chunk_size) =>
  Array(Math.ceil(array.length / chunk_size))
    .fill()
    .map((_, index) => index * chunk_size)
    .map((begin) => array.slice(begin, begin + chunk_size));

const bingoGuess = text.shift().split(",");
const bingoBoard = array_chunks(text, 5);
bingoBoard.forEach((element, i) => {
  element.forEach((el, j) => {
    bingoBoard[i][j] = el.split(" ").filter((ele) => ele != "");
  });
});
//console.log(bingoGuess);
const rowChecker = (card, index) => {
  if (scratchCard[card][index].every((el) => el === "@")) {
    return true;
  } else return false;
};
const vertChecker = (card, vertIndex) => {
  let scratched = 0;
  for (let i = 0; i < 5; i += 1) {
    if (scratchCard[card][i][vertIndex] === "@") {
      scratched += 1;
    }
  }
  if (scratched === 5) {
    return true;
  } else {
    return false;
  }
};
let numberGuessed = [];
let scoreCard = JSON.parse(JSON.stringify(bingoBoard));
let scratchCard = JSON.parse(JSON.stringify(bingoBoard));
console.log(scoreCard);
// bingoGuess.forEach((element) => {
//   numberGuessed.push(element);
//   scratchCard.forEach((card, i) => {
//     card.forEach((row, j) => {
//       row.forEach((ele, k) => {
//         if (ele === element) {
//           scratchCard[i][j][k] = "@";
//         }
//       });
//     });
//   });
// });
let firstCard;
loop1: for (let num of bingoGuess) {
  numberGuessed.push(num);
  for (const [i, card] of scratchCard.entries()) {
    for (const [j, row] of card.entries()) {
      for (const [k, ele] of row.entries()) {
        if (ele === num) {
          scratchCard[i][j][k] = "@";
          if (rowChecker(i, j)) {
            firstCard = ["row", i, j];
            break loop1;
          }
          if (vertChecker(i, k)) {
            firstCard = ["vert", i, k];
            break loop1;
          }
        }
      }
    }
  }
}
// console.log(scratchCard);
console.log(firstCard);
// console.log(scoreCard);
console.log(scoreCard[firstCard[1]]);
const scoreChecker = (firstCard) => {
  if (firstCard[0] === "vert") {
    scratchCard[firstCard[1]].forEach((el, index) => {
      scratchCard[firstCard[1]][index].splice(firstCard[2], 1);
    });
    console.log(scratchCard[firstCard[1]]);
    let total = scratchCard[firstCard[1]].reduce(
      (accum, curr) =>
        accum +
        curr.reduce(
          (sum, num) => (num === "@" ? sum : sum + parseInt(num, 10)),
          0
        ),
      0
    );
    console.log(total * numberGuessed[numberGuessed.length - 1]);
  }
};
scoreChecker(firstCard);
