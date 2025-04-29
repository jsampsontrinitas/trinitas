// The "machine" class is our base class; it doesn't extend anything. It provides the basis of all other machine-type objects and classes.
class Machine {
  weight;
  location;
  element;
  color;
  angle;
  // The constructor is the function/method that runs when we create an instance of our class. It can accept input, or provide its own default values for the properties of the object it creates.
  constructor ( in_weight = 100, x_coord = 10, y_coord = 10, color = "gray", angle = 0 ) {
    this.weight = in_weight;
    this.element = null;
    this.color = color;
    this.location = [ x_coord, y_coord ];
    this.angle = angle;
    console.log("Creating machine with weight of " + in_weight + " pounds");
    console.log("Oh, and it has a location of " + [ x_coord, y_coord ] );
  }

  // This method is responsible for creating our associated HTML element
  render () {
    // If an element already exists, no work to do--just return!
    if ( this.element ) return;

    // Create our new element!
    this.element = document.createElement("div");
    this.element.style.backgroundColor = this.color;
    this.element.style.width = "30px";
    this.element.style.height = "10px";
    this.element.style.transform = "rotate(" + this.angle + "rad)";

    // Place our element on the page itself
    document.body.appendChild(this.element);
  }
}

class Automobile extends Machine {
  fuel;
  moveSpeed;
  constructor ( in_fuel = 1, in_weight = 2_000, color = "gray", moveSpeed = 10 ) {
    super( in_weight, 10, 10, color );
    this.fuel = in_fuel;
    this.moveSpeed = moveSpeed;
    console.log("You've created an automobile with a tank that is " + in_fuel * 100 + "% full");
  }
}

// A tank is a special type of automobile, that inherits all properties of an automobile by virtue of extending that class. 
class Tank extends Automobile {
    rounds;
    constructor (rounds = 1_000, color = "green") {
        super( 1, 10_000, color);
        this.rounds = rounds;
        console.log("Your tank is alive!");
    }
}

const armyTank = new Tank( 1_000, "green");

armyTank.render();
// const vehicle = new Automobile( 0.5 );
// const faxmachine = new Machine( 500, 53, 32 );
