import MoveTowardBehaviour from './MoveTowardBehaviour';

class FleeBehaviour extends MoveTowardBehaviour {
  constructor(fleeFrom, fish, maxSpeed, acceleration) {
    const fleeFromQuadrant = {
      x: fleeFrom.x < fishTankSize * 0.5 ? 0 : 1,
      y: fleeFrom.y < fishTankSize * 0.5 ? 0 : 1
    };

    let deltaX = Math.random() * (fishTankSize * 0.25);
    let deltaY = Math.random() * (fishTankSize * 0.25);

    super(
      {
        x: fleeFromQuadrant.x === 0 ? deltaX : fishTankSize - deltaX,
        y: fleeFromQuadrant.y === 0 ? deltaY : fishTankSize - deltaY
      },
      fish,
      maxSpeed,
      acceleration,
      0
    );
  }
}