import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const banks = input.split("\n").map((e) => e.trim());
  // Get lowest index of each
  const lowest = [];
  for (let bank of banks) {
    const obj = {};
    for (let i = 0; i < bank.length; i++) {
      if (bank[i] in obj) continue;
      obj[bank[i]] = i;
    }
    lowest.push(obj);
  }
  // Get highest index of each
  const highest = [];
  for (let bank of banks) {
    const obj = {};
    for (let i = 0; i < bank.length; i++) {
      obj[bank[i]] = i;
    }
    highest.push(obj);
  }
  let jolts = [];
  for (let i = 0; i < banks.length; i++) {
    let max = 0;
    for (let num = 11; num < 100; num++) {
      let [l, h] = num.toString().split("");
      if (lowest[i][l] < highest[i][h]) max = Math.max(max, num);
    }
    jolts.push(max);
  }

  return jolts.reduce((a, e) => a + e, 0).toString();
};

// Monotonic stacks... forgot about those, oh joy! lol
const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const banks = input.split("\n").map((e) => e.trim());
  let len = 12;
  let total = 0;
  for (let bank of banks) {
    const stack = [];
    let left = bank.length - len;
    for (let num of bank) {
      while (stack.length && +num > stack[stack.length - 1] && left > 0) {
        stack.pop();
        left--;
      }
      stack.push(num);
    }
    total += +stack.slice(0, len).join("");
  }

  return total.toString();
};

run({
  part1: {
    tests: [
      {
        input: `
                987654321111111
                811111111111119
                234234234234278
                818181911112111`,
        expected: "357",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
                987654321111111
                811111111111119
                234234234234278
                818181911112111`,
        expected: "3121910778619",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
