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
// The basic logic is to keep a stack of the largest numbers
// by dropping (popping) values if we find a larger val until we run out of values to drop.
// By count, we can only drop as many values as the length of the array
// minus the length we need for the final result.
// So - while we still can drop values, if the next value is greater than
// the top of the stack, pop it, and add the new higher value.
// Repeat until we run out of values to drop or hit the end.
// The resulting stack will always be at least the size of the length we need.
// Then slice off the first N values from the array (N === the length we need)
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
