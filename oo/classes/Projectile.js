export default class Projectile {
  angle;
  x;
  y;
  startX;
  startY;
  speed;
  maxRange;
  maxDamage;

  /**
   * @type {HTMLDivElement}
   * @description The projectile's HTML element. This is the
   * element that will be drawn to the screen.
   */
  element;

  constructor(options) {
    const defaults = {
      angle: 0,
      x: 0,
      y: 0,
      startX: 0,
      startY: 0,
      speed: 2,
      maxRange: 300,
      maxDamage: 10,
    };

    let opts = { ...defaults, ...options };

    this.angle = opts.angle;
    this.x = opts.x;
    this.y = opts.y;
    this.startX = opts.startX || opts.x;
    this.startY = opts.startY || opts.y;
    this.speed = opts.speed;
    this.maxRange = opts.maxRange;
    this.maxDamage = opts.maxDamage;

    this.createAndAttachElement();
  }

  /**
   * @description Creates a new HTML element for the projectile
   * and attaches it to the document.
   */
  createAndAttachElement() {
    this.element = document.createElement("div");
    this.element.style.width = "3px";
    this.element.style.height = "3px";
    this.element.style.borderRadius = "50%";
    this.element.style.backgroundColor = "black";
    this.element.style.position = "absolute";
    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";

    document.body.appendChild(this.element);
  }

  /**
   * @returns {void} With no `return` statement, we implicitly return void.
   * @description Updates the projectile's position based on its speed
   * and angle. If the next position will be invalid (e.g., out of view),
   * then the project is destroyed. If the next position is valid, it
   * will be applied to the projectile's internal state.
   */
  update() {
    const nextX = this.x + Math.cos(this.angle) * this.speed;
    const nextY = this.y + Math.sin(this.angle) * this.speed;

    const xIsValid = nextX > 0 && nextX < innerWidth;
    const yIsValid = nextY > 0 && nextY < innerHeight;

    if (!xIsValid || !yIsValid) {
      this.destroy();
      return;
    }

    this.x = nextX;
    this.y = nextY;
  }

  /**
   * @description Draws the projectile at its current position. This
   * is done by setting the `top` and `left` CSS properties of the
   * projectile's element to the projectile's current `x` and `y`
   * coordinates.
   */
  draw() {
    this.element.style.top = this.y + "px";
    this.element.style.left = this.x + "px";
  }

  /**
   * @returns {boolean} Returns true if the projectile's element is
   * still connected to the document. This is used to determine if
   * the projectile should be drawn to the screen or not.
   */
  isConnected() {
    return this.element.isConnected;
  }

  /**
   * @description Destroys the projectile by removing it from the
   * DOM. It also calculates the distance traveled by the projectile
   * and logs it to the console.
   */
  destroy() {
    /**
     * Detaches the element from the document/page. We check to see if
     * a projectile is attached or not when we decide which projectiles
     * to continue drawing.
     */
    this.element.remove();

    /**
     * Calculate the straight-line (Euclidean) distance from the
     * starting point to the current position.
     */
    const distX = this.x - this.startX;
    const distY = this.y - this.startY;
    const distTraveled = Math.round(Math.hypot(distX, distY));

    console.log(`Projectile destroyed after traveling ${distTraveled}px`);
  }
}
