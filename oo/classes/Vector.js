export default class Vector {
  // Random point inside a box, leaving a "pad" border all around.
  static randInside(pad, width, height) {
    return new Vector(
      Math.random() * (width - pad) + pad / 2,
      Math.random() * (height - pad) + pad / 2
    );
  }

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  add(vector) {
    return new Vector(this.x + vector.x, this.y + vector.y);
  }

  sub(vector) {
    return new Vector(this.x - vector.x, this.y - vector.y);
  }

  mul(scalar) {
    return new Vector(this.x * scalar, this.y * scalar);
  }

  len() {
    return Math.hypot(this.x, this.y);
  }

  norm() {
    const l = this.len();
    return l ? this.mul(1 / l) : new Vector();
  }
}
