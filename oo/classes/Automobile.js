import Machine from "./Machine.js";
import utils from "../utils.js";

class Automobile extends Machine {
  fuel;
  moveSpeed;
  turnSpeed;
  destination;

  constructor(options) {
    const defaults = {
      fuel: 100,
      moveSpeed: 2,
      turnSpeed: 0.5,
      destination: null,
    };

    const opts = { ...defaults, ...options };

    super(opts);

    this.fuel = opts.fuel;
    this.moveSpeed = opts.moveSpeed;
    this.turnSpeed = opts.turnSpeed;
    this.destination = opts.destination;
  }

  driveForward() {
    console.log("Driving forward");
    this.x = this.x + Math.cos(this.angle) * this.moveSpeed;
    this.y = this.y + Math.sin(this.angle) * this.moveSpeed;
  }

  driveBackward() {
    console.log("Driving backwards");
    this.x = this.x - Math.cos(this.angle) * this.moveSpeed;
    this.y = this.y - Math.sin(this.angle) * this.moveSpeed;
  }

  turnLeft(amount = this.turnSpeed) {
    this.angle -= amount;
  }

  turnRight(amount = this.turnSpeed) {
    this.angle += amount;
  }

  rotateToward(angle, amount = this.turnSpeed) {
    const d = utils.shortestAngleDiff(this.angle, angle);
    this.angle = Math.abs(d) <= amount ? angle : this.angle + Math.sign(d) * amount;
  }

  setDestination(point) {
    this.destination = point;
  }

  clearDestination() {
    this.destination = null;
  }

  hasDestination() {
    return this.destination !== null;
  }

  selfDrive(obstacles) {
    console.log(`selfDrive method not implemented on Automobile`);
  }
}

export default Automobile;
