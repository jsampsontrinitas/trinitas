// Because this script was marked as [type='module'] in the index.html file, we
// can use `import` statements to pull code in from other scripts. By using the
// module approach, our project files now remain more organized, making them
// easier to navigate, extend, and maintain.
import Projectile from "./classes/Projectile.js";
import Tank from "./classes/Tank.js";

/**
 * We'll track all active projectiles in an array. This will make it easier for
 * us to cycle over them later, updating their locations, checking for collisions,
 * and more. We'll use `let` to create this array, since we'll be overwriting it
 * from time to time (as we add and remove projectiles).
 *
 * Below is what's referred to as a "JSDoc" comment. It provides additional info
 * about the variable. This states that our array is an array of Projectile
 * objects. Plus, when you hover over `projectiles` anywhere in this file, you'll
 * see a more helpful tooltip appear. Try it out, and compare with what you see
 * when you hover over `armyTank` or `pinkTank` below.
 * @type { Projectile[] }
 */
let projectiles = [];

// We're using `const` to create variables `armyTank` and `pinkTank`. Because
// we used `const` (and not `let`), we won't be able to assign a new value to
// either of theve variables without causing an error. This protects us from
// accidentally overwriting variables.
const tank = new Tank({
  location: { x: 100, y: 100 },
  rounds: 5,
  color: "green",
});

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
tank.render();

const pressedKeys = {
  KeyW: false,
  KeyA: false,
  KeyS: false,
  KeyD: false,
  ArrowUp: false,
  ArrowLeft: false,
  ArrowRight: false,
  ArrowDown: false,
};

function updateProjectiles() {
  /**
   * We're going to overwrite the `projectiles` variable with a filtered version
   * of itself. The filter cycles over all projectiles in the array, updates their
   * position (which might result in the projectile being "destroyed"), and then
   * chooses whether to keep the projectile in the array or not. If the projectile
   * is still connected to the DOM, we keep it. If not, we remove it from the array.
   */
  projectiles = projectiles.filter((projectile) => {
    /**
     * Inside this method, whether the projectile is kept in our array or not is
     * based on the return value. If we ultimately return `true`, the projectile
     * will remain in the array. If we return `false`, it will be removed.
     */
    projectile.update();

    /**
     * If the projectile's element is still connected to the DOM, we will draw it
     * at its new location, then return `true` to keep it around a bit longer.
     */
    if (projectile.isConnected()) {
      projectile.draw();
      return true;
    }

    /**
     * If the `return true` above didn't get executed, then `false` will be our
     * default return value. This means the projectile will be removed from the
     * array, and no longer drawn to the screen moving forward.
     */
    return false;
  });
}

function update() {
  // Loop through all projectiles, updating their state
  updateProjectiles();

  // Is the user driving forward/backward?
  if (pressedKeys.KeyW || pressedKeys.ArrowUp) {
    tank.driveForward();
  } else if (pressedKeys.KeyS || pressedKeys.ArrowDown) {
    tank.driveBackward();
  }

  // Is the user turning?
  if (pressedKeys.KeyA || pressedKeys.ArrowLeft) {
    tank.turnLeft();
  } else if (pressedKeys.KeyD || pressedKeys.ArrowRight) {
    tank.turnRight();
  }

  tank.update();

  requestAnimationFrame(update);
}

update();

/**
 * @description Creates a new projectile, passing a reference to
 * one of our tank so that we can use the x/y/angle properties.
 * @param {Tank} tank
 */
function createProjectile(tank) {
  /**
   * We start the projectile at the location of our tank (the
   * placement is a little off because x/y is not the center of
   * our tank, but rather our rear left corner). We also give
   * the projectile the same angle as the tank, so it will fly
   * in the same direction as the tank is facing.
   */
  const projectile = new Projectile({
    x: tank.location.x,
    y: tank.location.y,
    angle: tank.angle,
  });

  /**
   * Lastly, we push this new projectile object into to the array
   * of projectiles.
   */
  projectiles.push(projectile);
}

document.addEventListener("keydown", (event) => {
  /**
   * If the user pressed the spacebar, we want to create a new
   * projectile. We'll call the `createProjectile` function, passing
   * in the tank object. We pass in a reference to our tank so that
   * we can apply the tank's location and angle to the projectile.
   */
  if (event.code == "Space") {
    createProjectile(tank);
  }

  if (event.code in pressedKeys) {
    pressedKeys[event.code] = true;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.code in pressedKeys) {
    pressedKeys[event.code] = false;
  }
});
