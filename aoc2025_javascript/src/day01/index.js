import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let cur = 50;
  let len = 100;
  let count = 0;
  const lines = input
    .replace(/[LR]/g, (e) => (e === "L" ? "-" : "+"))
    .split("\n")
    .map(Number)
    .forEach((num) => {
      cur += num;
      cur = ((cur % len) + len) % len;
      if (cur === 0) count++;
    });
  return count.toString();
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `
                L68
                L30
                R48
                L5
                R60
                L55
                L1
                L99
                R14
                L82`,
        expected: "3",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
