export default {
  id: "add-two-numbers",
  title: "Add Two Numbers",
  difficulty: "beginner",
  defaultFile: "script.js",
  tests: [
    {
      desc: "add(2, 3) = 5",
      fn: "return add(2,3)===5;",
    },
    {
      desc: "add(5, 10) = 15",
      fn: "return add(5,10)===15;",
    },
  ],
};
