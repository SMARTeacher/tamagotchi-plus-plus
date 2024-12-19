class MoveTowardBehaviour {
    constructor(destination, fish, maxSpeed, acceleration, acceptanceRadius) {
      this.destination = destination;
      this.fish = fish;
      this.running = true;
  
      this.velocity = 0;
      this.maxSpeed = maxSpeed;
      this.acceleration = acceleration;
      this.acceptanceRadius = acceptanceRadius * Math.random();
    }
  
    update() {
      if (this.running) {
        this.moveTowardsTarget();
      }
    }
  
    moveTowardsTarget() {
      const delta = {
        x: this.destination.x - this.fish.x,
        y: this.destination.y - this.fish.y
      };
      const distance = Math.sqrt(delta.x ** 2 + delta.y ** 2);
  
      if (distance < this.acceptanceRadius) {
        this.velocity = 0;
        this.running = false;
      } else {
        const decelerationDistance = this.velocity ** 2 / (2 * this.acceleration);
  
        if (distance - this.acceptanceRadius > decelerationDistance) {
          this.velocity = Math.min(
            this.velocity + this.acceleration * (frameRate * 0.001),
            this.maxSpeed
          );
        } else {
          this.velocity = Math.max(this.velocity - this.acceleration * (frameRate * 0.001), 0);
        }
  
        const angle = Math.atan2(delta.y, delta.x);
  
        this.fish.x = Math.max(
          Math.min(
            this.fish.x + this.velocity * Math.cos(angle) * (frameRate * 0.001),
            fishTankSize - this.fish.size
          ),
          0
        );
        this.fish.y = Math.max(
          Math.min(
            this.fish.y + this.velocity * Math.sin(angle) * (frameRate * 0.001),
            fishTankSize - this.fish.size
          ),
          0
        );
      }
    }
  }