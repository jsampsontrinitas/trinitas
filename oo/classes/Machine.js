// Unlike Automobile.js and Tank.js, the Machine.js file does not "import" any
// resources from another script/module. The Machine.js file serves as the base
// class for all of our other classes. This file exports (as the "default") the
// `Machine` class so that it can be used by other files.
export default class Machine {

  // At the top of our class is where we have placed our "class fields"
  // Class fields help to make our code "self documenting," meaning you can
  // quickly identify what properties will exist on any instance of the Machine
  // class.
  weight;
  location;
  element;
  color;
  angle;

  // Our constructor is executed when we run `new Machine()`; it assigns a
  // default value of `{}` (i.e., an empty object) as the value of `options`.
  // If we created an instance with `new Machine({ color: 'red' })`, then the
  // object literal `{ color: 'red' }` would be referenced here by our
  // constructor as `options`.
  constructor(options = {}) {

    // We specify here the default values for class fields on this class.
    const defaults = {
      weight: 1,
      location: { x: 0, y: 0 },
      element: null,
      color: "gray",
      angle: 0,
    };

    // We use a variable called `opts` to hold the final class field values.
    // We construct an object literal that contains the properties from both
    // the `defaults` object, and the `options` object. We use the "spread
    // operator" (i.e., `...`) to spread the values of each object out into
    // a new object. Because `...options` comes later, any values it has that
    // also exist in `defaults` will be used, overriding our default values.
    const opts = { ...defaults, ...options };

    // Unlike other classes (e.g., Automobile and Tank), our constructor does
    // not call or invoke a `super()` method at this point. This is because we
    // are in the `Machine` class, which is our base class, and it does not
    // extend any other class whose constructor would need to be called.

    // Lastly, our constructor takes the final options/configurations, and
    // sets the corresponding properties on our object. Note the left and
    // right sides of the assignment operator (i.e., `=`). On the left side
    // we always have `this...`, and on the right side we have `opts...`.
    // We are taking the final options from `opts`, and using those for our
    // object instance. We do this for each class field declared above.
    this.weight = opts.weight;
    this.location = opts.location;
    this.element = opts.element;
    this.color = opts.color;
    this.angle = opts.angle;
  }

  // We create a simple `render` method (note: methods are simply functions
  // that belong to an object) on our base `Machine` class, which means all of
  // the classes higher up will inherit this method too! As a result, we'll be
  // able to execute code like `const tank = new Tank(); tank.render();`, which
  // invokes this method, but on the `tank` object.
  render() {

    // This method is responsible for creating the HTML element which
    // represents the object (the actual machine on the screen—a tank in our
    // case). We only want to execute this code once, so we check to see if our
    // object already has something in its `this.element` property. If it does,
    // we use the `return` keyword to exit the function immediately.
    if (this.element) return;

    // As you can see on line 28 above, we initialize the `this.element`
    // property to have a value of `null`, meaning there is no element
    // associated, so the first time this `render` method is executed, we
    // proceed on to the next lines.
    
    this.element = document.createElement("div"); // Create and store new DIV element
    this.element.style.backgroundColor = this.color; // Set CSS background-color
    this.element.style.width = "30px";  // Set a hard-coded "30px" value as CSS width
    this.element.style.height = "10px"; // Set a hard-coded "10px" value as CSS height

    // By setting the element's position to "absolute", we enable the element
    // to be arbitrarily positioned anywhere on the page via "left" and "top"
    // properties. Automobile instances rely on this to "drive" around the page.
    this.element.style.position = "absolute";

    // This next line sets the CSS `transform` property to a rotation value.
    // We use a "template literal" here to represent the final string value
    // without knowing what the final value will ultimately be. When this line
    // is ran, the `${ this.angle }` portion will be replaced with the value of
    // `this.angle` (e.g., 0, 1.5, 3.28172, etc.). Because we intialize this
    // object's `this.angle` to `0` (on line 30), the default value of this
    // line will be `rotate(0rad)` (i.e., a CSS-based rotation of 0 radians).
    this.element.style.transform = `rotate( ${ this.angle }rad )`;

    // Lastly, for the user to see our element, it must be attached to the
    // page. We call the `appendChild` method of the `document.body` object to
    // attach our element as a child. This effectively places our element
    // within the <body> and </body> tags as the last item.
    document.body.appendChild(this.element);
  }

  // The render method creates the HTML element and puts it on the page.
  // We will use the update method to transfer properties from our object to
  // our associated element.
  update () {
    // Below we take whatever `this.location.x` is, and we assign it via CSS
    // to the "left" property of the HTML element. This tells the element how
    // far from the left of the screen it is to be.
    this.element.style.top = this.location.y + "px";
    this.element.style.left = this.location.x + "px";
    this.element.style.transform = "rotate(" + this.angle + "rad)";
  }

} // END — export default class Machine …
