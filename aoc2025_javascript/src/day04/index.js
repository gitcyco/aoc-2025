import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const cloneGrid = (grid) => {
  const newGrid = [];
  for (let row of grid) {
    newGrid.push(row.slice());
  }
  return newGrid;
};

const checkAround = (matrix, once = false) => {
  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];
  const [yLen, xLen] = [matrix.length, matrix[0].length];
  let total = 0;

  let count = 0;
  let flag = true;
  while (flag) {
    const newMatrix = cloneGrid(matrix);
    for (let y = 0; y < yLen; y++) {
      for (let x = 0; x < xLen; x++) {
        let neighbors = 0;
        if (matrix[y][x] === ".") continue;
        for (let [yDir, xDir] of dirs) {
          const [newY, newX] = [y + yDir, x + xDir];
          if (
            newY >= 0 &&
            newY < yLen &&
            newX >= 0 &&
            newX < xLen &&
            matrix[newY][newX] === "@"
          ) {
            neighbors++;
          }
        }
        if (neighbors < 4) {
          count++;
          newMatrix[y][x] = ".";
        }
      }
    }
    if (count === 0) flag = false;
    total += count;
    count = 0;
    if (once) break;
    matrix = newMatrix;
  }

  return total;
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  const grid = input.split("\n").map((e) => e.split(""));
  const count = checkAround(grid, true);

  return count.toString();
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const grid = input.split("\n").map((e) => e.split(""));
  const count = checkAround(grid, false);
  console.log("FINAL COUNT:", count);
  return count.toString();
};

run({
  part1: {
    tests: [
      {
        input: `
                ..@@.@@@@.
                @@@.@.@.@@
                @@@@@.@.@@
                @.@@@@..@.
                @@.@@@@.@@
                .@@@@@@@.@
                .@.@.@.@@@
                @.@@@.@@@@
                .@@@@@@@@.
                @.@.@@@.@.`,
        expected: "13",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
                ..@@.@@@@.
                @@@.@.@.@@
                @@@@@.@.@@
                @.@@@@..@.
                @@.@@@@.@@
                .@@@@@@@.@
                .@.@.@.@@@
                @.@@@.@@@@
                .@@@@@@@@.
                @.@.@@@.@.`,
        expected: "43",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
