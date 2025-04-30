export function getRandomLocation(w = innerWidth, h = innerHeight) {
  return { x: Math.random() * (w - 60) + 30, y: Math.random() * (h - 60) + 30 };
}

export function getRandomColor() {
    const r = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const g = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const b = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
}

export function getAngle (x1, y1, x2, y2) {
  return Math.atan2( y2 - y1, x2 - x1 );
}

export default { getRandomLocation, getRandomColor };