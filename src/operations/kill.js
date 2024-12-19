const kill = (globalRefs, school, fish) => {
    if (!fish.type !== 'skelly') {
      fish.fish = globalRefs.skelly;
      fish.type = 'skelly';
      fish.desireX = fish.x;
      fish.desireY = fish.y;
      fish.restingPeriod = 200000;
      setTimeout(() => {
        const index = school.findIndex(schoolFish => fish.id === schoolFish.id);
        if (index !== -1) {
          school.splice(index, 1);
        }
      }, 10000);
    }
  };

export default kill;