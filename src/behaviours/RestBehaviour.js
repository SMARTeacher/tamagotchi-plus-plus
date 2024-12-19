class RestBehaviour {
  constructor(minDuration, maxDuration) {
    this.restDuration = minDuration + Math.random() * (maxDuration - minDuration);
    this.running = true;
  }

  update() {
    if (this.running) {
      this.restDuration -= frameRate * 0.001;
      if (this.restDuration < 0) {
        this.running = false;
      }
    }
  }
}