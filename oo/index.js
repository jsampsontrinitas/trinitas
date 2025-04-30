import Tank from "./Tank.js";

// A tank is a special type of automobile, that inherits all properties of an automobile by virtue of extending that class. 
const armyTank = new Tank({ rounds: 5, color: "green" });
const pinkTank = new Tank({ color: "pink" });

armyTank.render();
// const vehicle = new Automobile( 0.5 );
// const faxmachine = new Machine( 500, 53, 32 );
