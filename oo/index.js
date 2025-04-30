import Vector from "./classes/Vector.js";
import { randomPoint } from "./utils.js";
import Tank from "./classes/Tank.js";

const player = new Tank({
  x: 100,
  y: 100,
});

const bots = createTankBots(3);
const tanks = [player, ...bots];

const map = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const keyStore = {
  ArrowUp: false,
  ArrowRight: false,
  ArrowDown: false,
  ArrowLeft: false,
};

setupKeyBindings(keyStore);

let lastFrameUpdate = 0;

function setupKeyBindings(keyStore) {
  document.addEventListener("keydown", (event) => {
    if (event.key in keyStore) {
      event.preventDefault();
      keyStore[event.key] = true;
    }
  });

  document.addEventListener("keyup", (event) => {
    if (event.key in keyStore) {
      event.preventDefault();
      keyStore[event.key] = false;
    }
  });
}

function createTankBots(quantity, area) {
  const bots = [];
  const width = area?.width ?? innerWidth;
  const height = area?.height ?? innerHeight;

  for (let i = 0; i < quantity; i++) {
    const bot = new Tank();
    const size = Math.max(bot.width, bot.height);
    const location = Vector.randInside(size, width, height);

    bot.x = location.x;
    bot.y = location.y;
    bot.angle = Math.random() * Math.PI * 2;

    bots.push(bot);
  }

  return bots;
}

function update() {
  // Enforce a frame-rate of 24 frames per second
  if (performance.now() - lastFrameUpdate < 1000 / 24) {
    // Not enough time has passed, schedule another check ASAP
    return requestAnimationFrame(update);
  }

  lastFrameUpdate = performance.now();

  // Check for user input to move the player's tank
  if (keyStore.ArrowUp) player.driveForward();
  else if (keyStore.ArrowDown) player.driveBackward();

  if (keyStore.ArrowLeft) player.turnLeft();
  else if (keyStore.ArrowRight) player.turnRight();

  player.update();

  // Update all non-player tanks
  for (const tank of tanks.slice(1)) {
    // All other tanks will be self-driving
    let hasObstacle = false;
    const size = Math.max(tank.width, tank.height);
    const radius = size / 2;

    // An internal for...of loop to check all other tanks
    for (const tank2 of tanks) {
      // A tank cannot collide with itself
      if (tank2 === tank) continue;

      // Examine size and location of this other tank
      const dx = tank.x - tank2.x;
      const dy = tank.y - tank2.y;
      const distance = Math.hypot(dx, dy);

      // Determine if it's an obstacle worth avoiding
      if (distance < radius * 2 + 10) {
        hasObstacle = true;
        break;
      }
    }

    // Assign a destination
    if (hasObstacle || !tank.hasDestination()) {
      tank.setDestination(randomPoint(size, map.width, map.height));
    }

    // Tell the tank to drive towards its destination
    tank.selfDrive(tanks);
    tank.update();
  }

  requestAnimationFrame(update);
}

update();
