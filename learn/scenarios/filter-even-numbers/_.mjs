export default {
  id: "filter-even-numbers",
  title: "Filter Even Numbers",
  difficulty: "beginner",
  defaultFile: "script.js",
  tests: [
    {
      desc: `[1,2,3] → [2]`,
      fn: `return JSON.stringify(filterEven([1,2,3]))==='[2]';`,
    },
    {
      desc: `[4,5,6,7] → [4,6]`,
      fn: `return JSON.stringify(filterEven([4,5,6,7]))==='[4,6]';`,
    },
  ],
};
