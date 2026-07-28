export const G = 9.81;
export const freeFallTime = (height, gravity = G) => Math.sqrt((2 * height) / gravity);
export const vacuumDrop = (height, massA, massB, gravity = G) => ({ timeA: freeFallTime(height, gravity), timeB: freeFallTime(height, gravity), accelerationA: gravity, accelerationB: gravity, massA, massB });
export const collisionForces = (magnitude = 12000) => ({ truck: -Math.abs(magnitude), car: Math.abs(magnitude), equal: true });
export const projectileAt = (time, vx = 7, vy = 0, gravity = G) => ({ x: vx * time, y: vy * time - 0.5 * gravity * time * time, ax: 0, ay: -gravity });
