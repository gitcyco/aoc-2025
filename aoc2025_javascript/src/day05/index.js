import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let [ranges, ids] = input
    .split("\n\n")
    .map((e) => e.split("\n").map((a) => a.trim()));
  ranges = ranges.map((e) => e.split("-").map(Number));
  ids = ids.map(Number);

  console.log(ranges);
  console.log(ids);

  let count = 0;

  for (let id of ids) {
    let fresh = false;
    for (let [min, max] of ranges) {
      if (id >= min && id <= max) {
        fresh = true;
        break;
      }
    }
    if (fresh) count++;
  }
  console.log("answer:", count);
  return count.toString();
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let [ranges, ids] = input
    .split("\n\n")
    .map((e) => e.split("\n").map((a) => a.trim()));
  ranges = ranges.map((e) => e.split("-").map(Number));
  ids = ids.map(Number);

  // Merge ranges
  ranges = ranges.sort((a, b) => a[0] - b[0]);
  const merged = [];
  let curMin = -1;
  let curMax = -1;

  for (let [min, max] of ranges) {
    if (curMin === -1 && curMax === -1) {
      curMin = min;
      curMax = max;
    }
    if (min <= curMax) {
      if (curMax < max) curMax = max;
    } else {
      // its a new range
      merged.push([curMin, curMax]);
      curMin = min;
      curMax = max;
    }
  }

  if (
    merged[merged.length - 1][0] !== curMin &&
    merged[merged.length - 1][1] !== curMax
  ) {
    merged.push([curMin, curMax]);
  }

  // console.log("MERGED:", merged);

  let total = merged.reduce((a, e) => (a += e[1] - e[0] + 1), 0);
  console.log("TOTAL:", total);

  return total.toString();
};

run({
  part1: {
    tests: [
      {
        input: `
                3-5
                10-14
                16-20
                12-18

                1
                5
                8
                11
                17
                32`,
        expected: "3",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
                3-5
                10-14
                16-20
                12-18

                1
                5
                8
                11
                17
                32`,
        expected: "14",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
