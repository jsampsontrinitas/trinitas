import utils from "./utils.js";
import Tank from "./tank.js";

const tank = new Tank(1_000, "green");

tank.moveSpeed = 5;

const tanks = [tank];

for (let i = 0; i < 10; i++) {
  const botTank = new Tank(0, utils.getRandomColor());
  const location = utils.getRandomLocation();
  botTank.x = location.x;
  botTank.y = location.y;
  botTank.angle = Math.random() * Math.PI * 2;

  tanks.push(botTank);
}

document.addEventListener("keydown", (event) => {
  if (event.key in keysPressed) {
    event.preventDefault();
    keysPressed[event.key] = true;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key in keysPressed) {
    event.preventDefault();
    keysPressed[event.key] = false;
  }
});

const keysPressed = {
  ArrowUp: false,
  ArrowRight: false,
  ArrowDown: false,
  ArrowLeft: false,
};

let lastFrameUpdate = 0;

function update() {

  // Enforce a frame-rate of 24 frames per second
  if (performance.now() - lastFrameUpdate < 1000 / 24) {
    // Not enough time has passed, schedule another check ASAP
    return requestAnimationFrame(update);
  }

  lastFrameUpdate = performance.now();

  // Check for user input to re-position and re-orient tank(s)
  if (keysPressed.ArrowUp) tank.driveForward();
  else if (keysPressed.ArrowDown) tank.driveBackward();

  if (keysPressed.ArrowLeft) tank.turnLeft();
  else if (keysPressed.ArrowRight) tank.turnRight();

  for (let i = 0; i < tanks.length; i++) {
    //const _tank of tanks ) {
    const _tank = tanks[i];

    // Leave the user's tank alone
    if (_tank === tank) {
      tank.update();
      continue;
    }

    // Give the other tanks somewhere to go
    if (!_tank.hasDestination()) {
      const spot = utils.getRandomLocation();
      _tank.setDestination(spot.x, spot.y);
    }

    // Each tank should navigate to its next destination
    _tank.selfDrive();

    // Update the tank's location, orientation, etc.
    _tank.update();
  }

  requestAnimationFrame(update);
}

update();
