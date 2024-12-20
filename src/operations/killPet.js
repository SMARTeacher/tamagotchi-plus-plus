const killPet = (globalRefs, school, pet) => {
    if (!pet.type !== 'skelly') {
      pet.pet = globalRefs.skelly;
      pet.type = 'skelly';
      pet.desireX = pet.x;
      pet.desireY = pet.y;
      pet.restingPeriod = 200000;
      setTimeout(() => {
        const index = school.findIndex(schoolPet => pet.id === schoolPet.id);
        if (index !== -1) {
          school.splice(index, 1);
        }
      }, 10000);
    }
  };

export default killPet