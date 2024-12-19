import MoveTowardBehaviour from "./MoveTowardBehaviour";

class MoveAwayFromBehaviour extends MoveTowardBehaviour {
    constructor(fleeFrom, fish, maxSpeed, acceleration, fleeDistance) {
      super({ x: 0, y: 0 }, fish, maxSpeed, acceleration, 0);
  
      this.fleeFrom = fleeFrom;
      this.fleeDistance = fleeDistance;
    }
  
    update() {
      if (this.velocity === 0) {
        this.updateTarget();
      }
      this.moveTowardsTarget();
    }
  
    updateTarget() {
      const direction = this.getRandomDirectionVector();
  
      this.destination.x = this.fleeFrom.x + direction.x * this.fleeDistance;
      this.destination.y = this.fleeFrom.y + direction.y * this.fleeDistance;
    }
  
    getRandomDirectionVector() {
      let directionVector = { x: 1.0, y: 0.0 };
      const theta = Math.random() * 360 * Math.PI / 180;
      const cosAngle = Math.cos(theta);
      const sinAngle = Math.sin(theta);
  
      return {
        x: directionVector.x * cosAngle - directionVector.y * sinAngle,
        y: directionVector.x * sinAngle + directionVector.y * cosAngle
      };
    }
  }