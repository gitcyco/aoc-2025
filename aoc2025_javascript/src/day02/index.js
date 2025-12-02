import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const ids = input.split(",").map((e) => e.trim().split("-").map(Number));
  // console.log(ids);
  let total = 0;
  ids.forEach(([min, max]) => {
    for (let i = min; i <= max; i++) {
      let str = i.toString();
      if (str.length % 2) continue;
      let mid = str.length / 2;
      let left = str.slice(0, mid);
      let right = str.slice(mid);
      if (left === right) total += i;
    }
  });
  return total.toString();
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const ids = input.split(",").map((e) => e.trim().split("-").map(Number));
  // console.log(ids);
  let total = 0;
  const all = new Set();
  for (let [min, max] of ids) {
    for (let num = min; num <= max; num++) {
      let str = num.toString();
      let top = Math.floor(str.length / 2);
      for (let i = 1; i <= top; i++) {
        let part = str.slice(0, i);
        let qty = Math.floor(str.length / part.length);
        let rep = part.repeat(qty);
        // Tried a regex, it was 4 times slower than the repeat method!
        // Still brute force ugliness but only 500ms for full input
        if (rep === str) {
          all.add(num);
        }
      }
    }
  }
  total = [...all].reduce((a, e) => a + e, 0);
  console.log("SOLUTION:", total);
  return total.toString();
};

run({
  part1: {
    tests: [
      {
        input: `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
                1698522-1698528,446443-446449,38593856-38593862,565653-565659,
                824824821-824824827,2121212118-2121212124`,
        expected: "1227775554",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
                1698522-1698528,446443-446449,38593856-38593862,565653-565659,
                824824821-824824827,2121212118-2121212124`,
        expected: "4174379265",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
