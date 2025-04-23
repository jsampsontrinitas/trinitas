export default {
  id: "factorial",
  title: "Factorial",
  difficulty: "beginner",
  defaultFile: "script.js",
  tests: [
    { desc: "factorial(0) = 1", fn: `return factorial(0)===1;` },
    { desc: "factorial(5) = 120", fn: `return factorial(5)===120;` },
  ],
};
