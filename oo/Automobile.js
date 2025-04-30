import Machine from "./Machine.js";

export default class Automobile extends Machine {
  fuel;
  moveSpeed;

  constructor(options = {}) {
    const defaults = {
      fuel: 100,
      moveSpeed: 5,
    };

    const opts = { ...defaults, ...options };

    super(opts);

    this.fuel = opts.fuel;
    this.moveSpeed = opts.moveSpeed;
  }
}
