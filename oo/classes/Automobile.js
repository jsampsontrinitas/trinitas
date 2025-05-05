// We can import code from files which export code.
// This line imports whatever is exported by Machine.js by default (i.e.,
// whatever was exported using the keywords `export default …`), and uses the
// identifier "Machine" as a reference. In our case, we chose "Machine" as
// our identifier because the Machine.js file exports a class called Machine.
import Machine from "./Machine.js";

// Just as Machine.js used `export default …` to enable it's class to be used
// in other files, we will do the same from this file with the Automobile
// class.
export default class Automobile extends Machine {
  // At the top of our class is where we have placed our "class fields"
  // Class fields help to make our code "self documenting," meaning you can
  // quickly identify what properties will exist on any instance of the
  // Automobile class.
  fuel;
  moveSpeed;
  turnSpeed;

  // Our constructor is executed when we run `new Automobile()`; it assigns a
  // default value of `{}` (i.e., an empty object) as the value of `options`.
  // If we created an instance with `new Automobile({ color: 'red' })`, then
  // the object literal `{ color: 'red' }` would be referenced here by our
  // constructor as `options`.
  constructor(options = {}) {
    // We specify here the default values for class fields on this class.
    const defaults = {
      fuel: 100,
      moveSpeed: 5,
      turnSpeed: 0.15,
    };

    // We use a variable called `opts` to hold the final class field values.
    // We construct an object literal that contains the properties from both
    // the `defaults` object, and the `options` object. We use the "spread
    // operator" (i.e., `...`) to spread the values of each object out into
    // a new object. Because `...options` comes later, any values it has that
    // also exist in `defaults` will be used, overriding our default values.
    const opts = { ...defaults, ...options };

    // Because our class extends the Machine class, we need to also call the
    // Machine constructor, and pass it our `opts`, so that it too can setup
    // all of its own class fields for our object.
    super(opts);

    // Lastly, our constructor takes the final options/configurations, and
    // sets the corresponding properties on our object. Note the left and
    // right sides of the assignment operator (i.e., `=`). On the left side
    // we always have `this...`, and on the right side we have `opts...`.
    // We are taking the final options from `opts`, and using those for our
    // object instance. We do this for each class field declared above.
    this.fuel = opts.fuel;
    this.moveSpeed = opts.moveSpeed;
    this.turnSpeed = opts.turnSpeed;
  } // END — constructor( … )

  /**
   * When driving forward, we want to leverage Math.cos and Math.sin to update
   * our x and y coordinates. These will take our angle into consideration, and
   * move us forward (relative to the automobile's orientation). Rather than
   * assign the new coordinates in `location.location.x` and `this.location.y`,
   * we store the "next" value in a variable (e.g., `newX`). We can then check
   * to see that the next location is a permitted location. For instance, if
   * the next location would place the automobile off screen, or in an area that
   * is occupied by another automobile, then we do not want to proceed.
   */
  driveForward() {
    const newX = this.location.x + Math.cos(this.angle) * this.moveSpeed;
    const newY = this.location.y + Math.sin(this.angle) * this.moveSpeed;

    /**
     * We "clamp" our `newX` and `newY` to be between 0 and the browser widow
     * `innerWidth` and `innerHeight`. We use `Math.max` to return the larger
     * of two arbitrary values, and `Math.min` to return the smaller. Below we
     * use the output of `Math.min(innerWidth, newX/Y)` as the second argument
     * to `Math.max(0, …)`.
     */
    this.location.x = Math.max(0, Math.min(innerWidth, newX));
    this.location.y = Math.max(0, Math.min(innerHeight, newY));
  }

  driveBackward() {
    const newX = this.location.x - Math.cos(this.angle) * this.moveSpeed;
    const newY = this.location.y - Math.sin(this.angle) * this.moveSpeed;

    /**
     * Apply "clamped" values (read above for more details).
     */
    this.location.x = Math.max(0, Math.min(innerWidth, newX));
    this.location.y = Math.max(0, Math.min(innerHeight, newY));
  }

  turnLeft() {
    /**
     * TODO - Keep angle between 0 and 2 * Math.PI
     * We can do this by increasing the value by Math.PI * 2 when the angle is
     * less than 0, and decreasing the value by Math.PI * 2 when the angle is
     * greater than or equal to Math.PI * 2. We're effectively turning 115%
     * into 15%, and -15% into 85%, etc. The goal is to keep our numbers sane,
     * so our math doesn't suffer.
     *
     * This can also be done using modulo arithmetic:
     *   this.angle = (this.angle + 2 * Math.PI) % (2 * Math.PI);
     * This keeps the angle between 0 (inclusive) and 2 * Math.PI (exclusive).
     */
    this.angle -= this.turnSpeed;
  }

  turnRight() {
    // TODO - Keep angle between 0 and 2 * Math.PI
    this.angle += this.turnSpeed;
  }
} // END — export default class Automobile …
