import MoveTowardBehaviour from "./MoveTowardBehaviour";

class FidgetBehaviour extends MoveTowardBehaviour {
    constructor(distance, fish, maxSpeed, acceleration) {
      let directionVector = { x: 1.0, y: 0.0 };
      const theta = Math.random() * 360 * Math.PI / 180;
      const cosAngle = Math.cos(theta);
      const sinAngle = Math.sin(theta);
  
      directionVector.x = directionVector.x * cosAngle - directionVector.y * sinAngle;
      directionVector.y = directionVector.x * sinAngle + directionVector.y * cosAngle;
  
      super(
        {
          x: fish.x + directionVector.x * distance,
          y: fish.y + directionVector.y * distance
        },
        fish,
        maxSpeed,
        acceleration,
        0
      );
    }
  }