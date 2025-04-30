import Machine from "./machine.js";

class Automobile extends Machine {
  fuel;
  moveSpeed;
  turnSpeed;
  destination;

  constructor(
    fuel = 1,
    weight = 2_000,
    color = "gray",
    moveSpeed = 10,
    turnSpeed = 0.05
  ) {
    super(weight, 10, 50, color);

    this.fuel = fuel;
    this.moveSpeed = moveSpeed;
    this.turnSpeed = turnSpeed;
    this.destination = null;
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

  turnLeft() {
    this.angle -= this.turnSpeed;
  }

  turnRight() {
    this.angle += this.turnSpeed;
  }

  setDestination(x, y) {
    console.log(`Setting destination`, this, x, y );
    this.destination = { x, y };
  }

  clearDestination() {
    console.log(`Clearing destination`, this);
    this.destination = null;
  }

  hasDestination() {
    return this.destination !== null;
  }

  selfDrive() {
    throw new Error("Implement elsewhere.");
  }
}

export default Automobile;
