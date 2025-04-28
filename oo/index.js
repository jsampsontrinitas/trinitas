// The "machine" class is our base class; it doesn't extend anything. It provides the basis of all other machine-type objects and classes.
class Machine {
  weight;
  coords = [0, 0];
  // The constructor is the function/method that runs when we create an instance of our class. It can accept input, or provide its own default values for the properties of the object it creates.
  constructor ( in_weight = 100, x_coord = 10, y_coord = 10 ) {
    console.log("Creating machine with weight of " + in_weight + " pounds");
    console.log("Oh, and it has coords of " + [ x_coord, y_coord ] );
    this.weight = in_weight;
    this.coords = [ x_coord, y_coord ];
  }
}


class Automobile extends Machine {
  constructor ( in_fuel, in_weight = 2_000 ) {
    super( in_weight );
    console.log("You've created an automobile with a tank that is " + in_fuel + "% full");
    this.fuel = in_fuel;
  }
}

// A tank is a special type of automobile, that inherits all properties of an automobile by virtue of extending that class. 
class Tank extends Automobile {
    weight;
    fuel;
    color  = "gray";
    constructor (color) {
        super( 1, 10_000);
        this.color = color;
        console.log("Your tank is alive!");
    }
}

const armyTank = new Tank("green");
const vehicle = new Automobile( 0.5 );
const faxmachine = new Machine( 500, 53, 32 );
