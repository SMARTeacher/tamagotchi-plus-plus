import {
    bbqSize,
    petTankSize,
    pointSize,
    bbqEatingThreshold,
} from '../config';

import { addPet } from './index';

let id = 1;

const addBbq = options => {
    const { globalRefs, school, bbqs } = options;
    if (globalRefs === undefined) return;
    const newBbq = {
      id: `bbq${id}`,
      type: 'bbq',
      bbq: globalRefs.bbq,
      health: 1000,
      x: Math.floor(Math.random() * (petTankSize - bbqSize)),
      y: Math.floor(Math.random() * (petTankSize - bbqSize)),
      size: pointSize,
      updateBbq: function() {
        if (this.health > 0) {
          let nibble = 0;
          school.forEach(pet => {
            if (
              Math.sqrt((pet.x - this.x) ** 2) + Math.sqrt((pet.y - this.y) ** 2) <
              bbqEatingThreshold
            ) {
              nibble++;
            }
          });
          this.health -= nibble;
          if (this.health <= 0) {
            this.bbq = globalRefs.bbqDeath;
            setTimeout(() => {
              const index = bbqs.findIndex(bbq => bbq.id === this.id);
              bbqs.splice(index, 1);
              addPet({globalRefs, school, bbqs });
            }, 5000);
          }
        }
      }
    };
  
    id++;
    bbqs.push(newBbq);
  };

export default addBbq;