export default {
  id: "highlight-long-words",
  title: "Highlight Long Words",
  difficulty: "intermediate",
  defaultFile: "index.html",
  tests: [
    {
      desc: "words >6 chars are wrapped",
      fn: `
          document.getElementById('doit').click();
          // JavaScript, enables, applications
          return document.querySelectorAll('#text .highlight').length === 3;
        `,
    },
  ],
};
