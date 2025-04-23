export default {
  id: "toggle-box",
  title: "Toggle Box",
  difficulty: "beginner",
  defaultFile: "index.html",
  tests: [
    {
      desc: "toggle works",
      fn: `
        const box = document.getElementById('box');
        box.click();
        
        return box.classList.contains('active');
      `
    }
  ]
};
