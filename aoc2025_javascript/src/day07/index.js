import run from "aocrunner";

const parseInput = (rawInput) => {
  const grid = rawInput.split("\n").map((e) => e.trim().split(""));
  return grid;
};

const part1 = (rawInput) => {
  const grid = parseInput(rawInput);
  // console.log(grid);
  let count = 0;
  const yLen = grid.length;
  const xLen = grid[0].length;
  for (let y = 1; y < yLen; y++) {
    for (let x = 0; x < xLen; x++) {
      if (grid[y][x] === "^") {
        if (grid[y - 1][x] === "S") {
          if (x > 0) grid[y][x - 1] = "S";
          if (x < xLen - 1) grid[y][x + 1] = "S";
          count++;
        }
      } else {
        if (grid[y - 1][x] === "S") {
          grid[y][x] = "S";
        }
      }
    }
  }
  // console.table(grid);
  // console.log(count);
  return count.toString();
};

const part2 = (rawInput) => {
  const matrix = parseInput(rawInput);
  let startY = 0;
  let startX = matrix[0].indexOf("S");
  const memo = new Map();

  // console.table(matrix);
  console.log(startY, startX);
  let count = 1;

  const traverse = (grid, y, x) => {
    if (y >= grid.length) return 0;

    if (grid[y][x] !== "^") {
      const nextCoord = `${y + 1},${x}`;
      if (memo.has(nextCoord)) return memo.get(nextCoord);
      else {
        const result = traverse(grid, y + 1, x);
        memo.set(nextCoord, result);
        return result;
      }
    }

    const nextLeft = `${y + 1}, ${x - 1}`;
    const nextRight = `${y + 1},${x + 1}`;

    const leftResult = memo.has(nextLeft)
      ? memo.get(nextLeft)
      : traverse(grid, y + 1, x - 1);
    const rightResult = memo.has(nextRight)
      ? memo.get(nextRight)
      : traverse(grid, y + 1, x + 1);

    memo.set(nextLeft, leftResult);
    memo.set(nextRight, rightResult);
    return 1 + leftResult + rightResult;
  };
  count += traverse(matrix, startY + 1, startX, 1);
  return count.toString();
};

run({
  part1: {
    tests: [
      {
        input: `
                .......S.......
                ...............
                .......^.......
                ...............
                ......^.^......
                ...............
                .....^.^.^.....
                ...............
                ....^.^...^....
                ...............
                ...^.^...^.^...
                ...............
                ..^...^.....^..
                ...............
                .^.^.^.^.^...^.
                ...............`,
        expected: "21",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
                .......S.......
                ...............
                .......^.......
                ...............
                ......^.^......
                ...............
                .....^.^.^.....
                ...............
                ....^.^...^....
                ...............
                ...^.^...^.^...
                ...............
                ..^...^.....^..
                ...............
                .^.^.^.^.^...^.
                ...............`,
        expected: "40",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
