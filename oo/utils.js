import Vector from "./classes/Vector.js";

const wW = window.innerWidth;
const wH = window.innerHeight;

export function randomPoint(buffer = 0, width = wW, height = wH) {
  return Vector.randInside(buffer * 2, width, height);
}

export function shortestAngleDiff(currentAngle, targetAngle) {
  const TWO_PI = Math.PI * 2;
  let diff = (targetAngle - currentAngle) % TWO_PI;
  if (diff > Math.PI) diff -= TWO_PI;
  if (diff < -Math.PI) diff += TWO_PI;
  return diff;
}

export function getRandomColor() {
  const r = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, "0");
  const g = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, "0");
  const b = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, "0");
  return `#${r}${g}${b}`;
}

export function getAngle(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1);
}

export default { randomPoint, getAngle, shortestAngleDiff, getRandomColor };
