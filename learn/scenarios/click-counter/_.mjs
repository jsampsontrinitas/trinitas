export default {
  id: "click-counter",
  title: "Click Counter",
  difficulty: "beginner",
  defaultFile: "index.html",
  tests: [
    {
      desc: "increments after click",
      fn: `
          const btn = document.getElementById('btn');
          const span = document.getElementById('count');
          btn.click();  // 1
          btn.click();  // 2
          return span.textContent === "2";
        `,
    },
  ],
};
