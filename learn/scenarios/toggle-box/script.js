function setup() {
  const box = document.getElementById("box");
  box.addEventListener("click", () => box.classlist.toggle("active"));
}

setup();
