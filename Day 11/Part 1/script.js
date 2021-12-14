let fs = require("fs");

let text = fs.readFileSync("input.txt", "utf8").split("\n");

text = text.map((el) => el.split(""));
let boomsCounter = 0;
const explosion = (board) => {
  if (board.every((row) => row.every((el) => el <= 9))) {
    return board;
  }
  for (const [i, row] of board.entries()) {
    for (const [j, ele] of row.entries()) {
      // console.log(i, j);
      if (ele === 10) {
        board[i][j] = 0;
        boomsCounter += 1;
        if (board[i - 1]?.[j - 1] && ![0, 10].includes(board[i - 1][j - 1]))
          board[i - 1][j - 1] += 1;
        if (board[i - 1]?.[j] && ![0, 10].includes(board[i - 1][j]))
          board[i - 1][j] += 1;
        if (board[i - 1]?.[j + 1] && ![0, 10].includes(board[i - 1][j + 1]))
          board[i - 1][j + 1] += 1;
        if (board[i][j - 1] && ![0, 10].includes(board[i][j - 1]))
          board[i][j - 1] += 1;

        if (board[i][j + 1] && ![0, 10].includes(board[i][j + 1]))
          board[i][j + 1] += 1;
        if (board[i + 1]?.[j - 1] && ![0, 10].includes(board[i + 1][j - 1]))
          board[i + 1][j - 1] += 1;
        if (board[i + 1]?.[j] && ![0, 10].includes(board[i + 1][j]))
          board[i + 1][j] += 1;
        if (board[i + 1]?.[j + 1] && ![0, 10].includes(board[i + 1][j + 1]))
          board[i + 1][j + 1] += 1;
      }
    }
  }
  return explosion(board);
};

for (let i = 0; i < 100; i += 1) {
  text.forEach((row, rowIndex) => {
    row.forEach((ele, colIndex) => {
      text[rowIndex][colIndex] = Number(ele) + 1;
    });
  });
  text = explosion(text);
}

console.log(text);
console.log(boomsCounter);
