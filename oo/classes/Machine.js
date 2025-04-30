import Vector from "./Vector.js";

class Machine {
  // Element position and presentation
  element;
  x;
  y;
  width;
  height;
  color;
  angle;

  // Invisible qualities
  weight;

  // Sprite details
  sprite;
  backgroundPositionX;
  backgroundPositionY;

  constructor(options) {
    // Default options for machines
    const defaults = {
      x: 10,
      y: 10,
      width: 10,
      height: 10,
      color: "gray",
      angle: 0,
      weight: 100,
    };

    // Blend, and apply our options
    const opts = { ...defaults, ...options };

    for (const [key, value] of Object.entries(opts)) {
      this[key] = value;
    }

    // Make our machine visible to the user/player
    this.render();
  }

  get pos() {
    return new Vector(this.x, this.y);
  }

  set pos(vector) {
    this.x = vector.x;
    this.y = vector.y;
  }

  get size() {
    return Math.max(this.width, this.height);
  }

  render() {
    if (this.element) return;

    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.backgroundRepeat = "no-repeat";

    if (this.sprite) {
      this.element.style.backgroundImage = `url(${this.sprite})`;
      this.element.style.backgroundPosition = `${this.backgroundPositionX}px ${this.backgroundPositionY}px`;
    } else {
      this.element.style.backgroundColor = this.color;
    }

    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";

    document.body.appendChild(this.element);
  }

  update() {
    this.element.style.top = this.y + "px";
    this.element.style.left = this.x + "px";
    this.element.style.transform =
      "translate(-50%, -50%) rotate(" + this.angle + "rad)";
    // We only apply colors when a sprite hasn't been provided
    if (!this.sprite) {
      this.element.style.backgroundColor = this.color;
    }
  }
}

export default Machine;
