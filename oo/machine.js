class Machine {
  weight;
  x;
  y;
  destination;
  element;
  color;
  angle;

  constructor(weight = 100, x = 10, y = 10, color = "gray", angle = 0) {
    this.weight = weight;
    this.element = null;
    this.color = color;
    this.x = x;
    this.y = y;
    this.angle = angle;

    this.render();
  }

  render() {
    if (this.element) return;

    this.element = document.createElement("div");
    this.element.style.position = "absolute";

    const cannon = document.createElement("div");
    cannon.style.position = "absolute";
    cannon.style.width = "60px";
    cannon.style.height = "10px";
    cannon.style.backgroundColor = "#333";
    cannon.style.top = "calc(50% - 5px)";
    cannon.style.left = "40%";

    this.element.appendChild(cannon);

    this.update();

    document.body.appendChild(this.element);
  }

  update() {
    this.element.style.width = "60px";
    this.element.style.height = "40px";
    this.element.style.top = this.y + "px";
    this.element.style.left = this.x + "px";
    this.element.style.backgroundColor = this.color;
    this.element.style.transform = "rotate(" + this.angle + "rad)";
  }
}

export default Machine;