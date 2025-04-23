export default {
  id: "reverse-a-string",
  title: "Reverse-a-String",
  difficulty: "beginner",
  defaultFile: "script.js",
  tests: [
    {
      desc: `reverse("racecar") → "racecar"`,
      fn: `return reverse("racecar")==="racecar";`,
    },
    {
      desc: `reverse("JavaScript") → "tpircSavaJ"`,
      fn: `return reverse("JavaScript")==="tpircSavaJ";`,
    },
  ],
};
