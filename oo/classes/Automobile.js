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

  driveForward() {
    this.location.x = this.location.x + this.moveSpeed;
  }

  driveBackward() {
    this.location.x = this.location.x - this.moveSpeed;
  }

  turnLeft() {
    this.angle = this.angle - this.turnSpeed;
  }

  turnRight() {
    this.angle = this.angle + this.turnSpeed;
  }
} // END — export default class Automobile …
