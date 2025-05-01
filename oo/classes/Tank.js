// We can import code from files which export code.
// This line imports whatever is exported by Automobile.js by default (i.e.,
// whatever was exported using the keywords `export default …`), and uses the
// identifier "Automobile" as a reference. In our case, we chose "Automobile"
// as our identifier because the Automobile.js file exports an `Automobile`
// class.
import Automobile from "./Automobile.js";

// Just as Automobile.js used `export default …` to enable it's class to be
// used in other files, we will do the same from this file with the Tank class.
export default class Tank extends Automobile {

  // At the top of our class is where we have placed our "class fields"
  // Class fields help to make our code "self documenting," meaning you can
  // quickly identify what properties will exist on any instance of the Tank
  // class.
  rounds;

  // Our constructor is executed when we run `new Tank()`; it assigns a default
  // value of `{}` (i.e., an empty object) as the value of `options`. If we
  // created an instance with `new Tank({ rounds: 10 })`, then the object
  // literal `{ rounds: 10 }` would be referenced here by our constructor as
  // `options`.
  constructor( options = {} ) {

    // We specify here the default values for class fields on this class.
    const defaults = {
        rounds: 100
    };

    // We use a variable called `opts` to hold the final class field values.
    // We construct an object literal that contains the properties from both
    // the `defaults` object, and the `options` object. We use the "spread
    // operator" (i.e., `...`) to spread the values of each object out into
    // a new object. Because `...options` comes later, any values it has that
    // also exist in `defaults` will be used, overriding our default values.
    const opts = { ...defaults, ...options };

    // Because our class extends the Automobile class, we need to also call the
    // Automobile constructor, and pass it our `opts`, so that it too can setup
    // all of its own class fields for our object.
    super( opts );

    // Lastly, our constructor takes the final options/configurations, and
    // sets the corresponding properties on our object. Note the left and
    // right sides of the assignment operator (i.e., `=`). On the left side
    // we always have `this...`, and on the right side we have `opts...`.
    // We are taking the final options from `opts`, and using those for our
    // object instance. We do this for each class field declared above.
    this.rounds = opts.rounds;

    // Lastly we have a diagnostic helper. If this appears in our console, then
    // we can rest assured the code has executed successfully up to this point.
    console.log("Your tank is alive!");

  } // END — constructor( … )

} // END — export default class Tank …
