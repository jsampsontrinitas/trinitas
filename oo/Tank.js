import Automobile from "./Automobile.js";

export default class Tank extends Automobile {
  rounds;

  // Receives user input via the "options" object
  constructor( options = {} ) {

    // Specifies default property values for all tanks
    const defaults = {
        rounds: 100
    };

    // Allows the user-provided values to optionally overwrite our defaults
    const opts = { ...defaults, ...options };

    // Sends the resulting options to the Automobile constructor
    super( opts );

    // Assigns the resulting rounds property to this object
    this.rounds = opts.rounds;

    console.log("Your tank is alive!");
  }
}
