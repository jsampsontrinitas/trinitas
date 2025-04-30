import Automobile from "./Automobile.js";
import Vector from "./Vector.js";

class Tank extends Automobile {
  rounds;

  constructor(options = {}) {
    const defaults = {
      fuel: 100,
      rounds: 100,
      weight: 10_000,
      moveSpeed: 8,
      turnSpeed: 0.15,
      width: 136,
      height: 82,
      sprite: "images/tanks.png",
      backgroundPositionX: -10,
      backgroundPositionY: -14,
    };

    // Blend, and apply our options
    const opts = { ...defaults, ...options };

    super(opts);

    this.rounds = opts.rounds;
  }

  selfDrive(obstacles) {
    const SEEK_WEIGHT = 1;
    const AVOID_WEIGHT = 1.4;
    const AVOID_RADIUS = this.size * 6;
    const DEST_THRESHOLD = 6;
    const ANGLE_THRESHOLD = 0.1;

    if (!this.hasDestination()) return;

    // Steer toward our destination
    const destinationDistance = this.destination.sub(this.pos);
    let seekForce = destinationDistance.norm().mul(SEEK_WEIGHT);

    // Turn away from any nearby obstacles
    let avoidForce = new Vector();

    for (const obstacle of obstacles) {
      if (obstacle === this) continue;
      const offset = this.pos.sub(obstacle.pos);
      const distance = offset.len();
      if (distance < AVOID_RADIUS && distance > 0) {
        const weight = ((AVOID_RADIUS - distance) / AVOID_RADIUS) ** 2;
        avoidForce = avoidForce.add(offset.norm().mul(weight));
      }
    }

    avoidForce = avoidForce.mul(AVOID_WEIGHT);

    // Merge forces, clamp, and move
    let steer = seekForce.add(avoidForce);
    if (steer.len() > 1) steer = steer.norm();
    steer = steer.mul(this.moveSpeed);

    const desiredAngle = Math.atan2(steer.y, steer.x);

    // Rotate toward the desired angle
    this.rotateToward(desiredAngle, this.turnSpeed);

    // Only move if facing (almost) the right direction
    let angleDiff = Math.abs(this.angle - desiredAngle);
    // Normalize angleDiff to [0, PI]
    angleDiff = Math.abs(Math.atan2(Math.sin(angleDiff), Math.cos(angleDiff)));

    if (angleDiff < ANGLE_THRESHOLD) {
      this.pos = this.pos.add(
        new Vector(
          Math.cos(this.angle) * this.moveSpeed,
          Math.sin(this.angle) * this.moveSpeed
        )
      );
    }

    // Remove destination when close enough
    if (destinationDistance.len() < DEST_THRESHOLD) {
      this.clearDestination();
    }
  }
}

export default Tank;
