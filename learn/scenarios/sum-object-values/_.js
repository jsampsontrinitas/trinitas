export default   {
    id: "sum-object-values",
    title: "Sum Object Values",
    difficulty: "beginner",
    defaultFile: "script.js",
    tests: [
      { desc: `{x:2,y:8} → 10`, fn: `return sumValues({x:2,y:8})===10;` },
      {
        desc: `{a:1,b:'two',c:3} → 4`,
        fn: `return sumValues({a:1,b:'two',c:3})===4;`,
      },
    ],
  };