import run from "aocrunner";

const parseInput1 = (rawInput) => {
  const grid = rawInput
    .split(/\n+/)
    .reverse()
    .map((e) => e.trim().split(/\s+/));
  return grid;
};

const parseInput2 = (rawInput) => {
  return rawInput.split("\n");
};

const part1 = (rawInput) => {
  const grid = parseInput1(rawInput);
  const yLen = grid.length;
  const xLen = grid[0].length;

  let total = 0;

  for (let x = 0; x < xLen; x++) {
    let result = null;
    let op = grid[0][x];
    for (let y = 1; y < yLen; y++) {
      let num = +grid[y][x];
      if (result == null) {
        result = num;
      } else {
        if (op === "*") result *= num;
        if (op === "+") result += num;
      }
    }
    total += result;
  }
  // console.log("RESULt:", total);
  return total.toString();
};

const part2 = (rawInput) => {
  const grid = parseInput2(rawInput);

  let xLen = grid[0].length;
  let yLen = grid.length;
  let row = [];
  let total = 0;

  // They can be variable length, so to find where a column ends from right -> left:
  // as you move down, check if the final row is a math symbol (* +) and if it is
  // then that is a complet set of numbers. Do the math op on them, and move to the next column.
  let stop = false;
  for (let x = xLen - 1; x >= 0; x--) {
    let num = "";
    let op = "";
    for (let y = 0; y < yLen; y++) {
      let char = grid[y][x];
      if (/[*+]/.test(char)) {
        stop = true;
        op = char;
      } else if (char && char !== " " && y !== yLen - 1) num += char;
    }
    if (stop) {
      if (num) row.push(+num);
      total += row.reduce((a, e) => (op === "*" ? a * e : a + e));
      stop = false;
      row = [];
    } else {
      if (num) row.push(+num);
    }
  }
  console.log("PART 2 ANSWER:", total);
  return total.toString();
};

run({
  part1: {
    tests: [
      {
        input: `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `,
        expected: "4277556",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `,
        expected: "3263827",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
