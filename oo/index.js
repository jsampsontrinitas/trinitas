// Because this script was marked as [type='module'] in the index.html file, we
// can use `import` statements to pull code in from other scripts. By using the
// module approach, our project files now remain more organized, making them
// easier to navigate, extend, and maintain.
import Tank from "./classes/Tank.js";

// We're using `const` to create variables `armyTank` and `pinkTank`. Because
// we used `const` (and not `let`), we won't be able to assign a new value to
// either of theve variables without causing an error. This protects us from
// accidentally overwriting variables.
const armyTank = new Tank({ rounds: 5, color: "green" });

// While the `pinkTank` variable is unused at this point (unlike the `armyTank`
// cariable which was used to call `armyTank.render()`), it serves as a good
// example of how we can flexibly use the Tank constructor to provide only the
// values we'd like to use during object creation. For the `armyTank`, we told
// the constructor to give us 5 rounds by default, and use "green" as the color
// of the tank itself. Here we had no request for how many `rounds` we'd like,
// which means our `pinkTank` will get the default (see Tank.js, line 28). We
// do specify that we'd like the color "pink" to be used, however. This config
// will be provided to the Tank constructor, which will provide it to the
// Automobile constructor, which will provide it ultimately to the Machine
// constructor, which will use it to replace the otherwise default color.
const pinkTank = new Tank({ color: "pink" });

// The `render` method demonstrates another important detaila about
// object-oriented programming. You can check Tank.js for a render method, but
// you won't find one at this time. You can check Automobile.js for a render
// method, but you won't find one there either. Instead, the render method is
// added by the Machine.js file, as part of the Machine class. Because Tank is
// a type of Automobile, which itself is a type of Machine, Tank therefore
// "inherits" the render method.
armyTank.render();

const pressedKeys = {
  "KeyW": false,
  "KeyA": false,
  "KeyS": false,
  "KeyD": false,
  "ArrowUp": false,
  "ArrowLeft": false,
  "ArrowRight": false,
  "ArrowDown": false,
};

function update () {

  // Is the user driving forward/backward?
  if ( pressedKeys.KeyW || pressedKeys.ArrowUp ) {
    armyTank.driveForward();
  } else if ( pressedKeys.KeyS || pressedKeys.ArrowDown ) {
    armyTank.driveBackward();
  }

  // Is the user turning?
  if ( pressedKeys.KeyA || pressedKeys.ArrowLeft ) {
    armyTank.turnLeft();
  } else if ( pressedKeys.KeyD || pressedKeys.ArrowRight ) {
    armyTank.turnRight();
  }

  armyTank.update();

  requestAnimationFrame(update);

}

update();

document.addEventListener("keydown", (event) => {
  if ( event.code in pressedKeys ) {
    pressedKeys[ event.code ] = true;
  }
});

document.addEventListener("keyup", (event) => {
  if ( event.code in pressedKeys ) {
    pressedKeys[ event.code ] = false;
  }
});