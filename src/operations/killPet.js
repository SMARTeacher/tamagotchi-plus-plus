import { refs, school } from '../constants/state';

const killPet = (pet) => {
  if (!pet.type !== 'skelly') {
      pet.type = 'skelly';
      pet.desireX = pet.x;
      pet.desireY = pet.y;
      pet.restingPeriod = 200000;
      pet.currentDesireType = null;
      setTimeout(() => {
        const index = school.findIndex(schoolPet => pet.id === schoolPet.id);
        if (index !== -1) {
          school.splice(index, 1);
        }
      }, 10000);
    }
  };

export default killPet