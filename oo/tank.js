import Automobile from "./automobile.js";
import { getAngle } from "./utils.js";

class Tank extends Automobile {
  rounds;

  constructor(rounds = 1_000, color = "green") {
    super(1, 10_000, color, 5, 0.15);
    this.rounds = rounds;
  }

  selfDrive() {

    // If we don't have a destination, we have nowhere to drive
    if ( !this.hasDestination() ) {
      return;
    }

    // Get angle from current position to destination
    const angleToDestination = getAngle(
      this.x,
      this.y,
      this.destination.x,
      this.destination.y
    );

    // The tank must first turn to face the target
    if (this.angle !== angleToDestination) {

      // Determine delta to the desired angle
      const diff = angleToDestination - this.angle;

      if (Math.abs(diff) < this.turnSpeed) {
        // If we would overshoot by turning any more, just set directly
        this.angle = angleToDestination;
      } else {
        // Turn proper direction for shortest path to desired angle
        const adjustedDiff = ((diff + Math.PI) % (2 * Math.PI)) - Math.PI;
        this.angle += Math.sign(adjustedDiff) * this.turnSpeed;
      }

      return;
    }

    if (this.x !== this.destination.x || this.y !== this.destination.y) {
      // Assuming our angle is now correct, we can proceed forward
      const distanceX = this.destination.x - this.x;
      const distanceY = this.destination.y - this.y;
      const distanceToDestination = Math.hypot(distanceX, distanceY);

      if (distanceToDestination < this.moveSpeed) {
        // If we're super close, let's just snap ourselves to the coords
        this.x = this.destination.x;
        this.y = this.destination.y;
      } else {
        this.x += Math.cos(this.angle) * this.moveSpeed;
        this.y += Math.sin(this.angle) * this.moveSpeed;
      }
      
      return;
    }

    // If our angle and location are that of our destinations, we arrived.
    this.clearDestination();
  }
}

export default Tank;
