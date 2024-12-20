import {
    cheeseSize,
    petTankSize,
    pointSize,
    cheeseEatingThreshold,
} from '../config';

import { addPet } from './index';

let id = 1;

const addCheese = options => {
    const { globalRefs, school, cheeses } = options;
    if (globalRefs === undefined) return;
    const newCheese = {
      id: `cheese${id}`,
      type: 'cheese',
      cheese: globalRefs.cheese,
      health: 1000,
      x: Math.floor(Math.random() * (petTankSize - cheeseSize)),
      y: Math.floor(Math.random() * (petTankSize - cheeseSize)),
      size: pointSize,
      updateCheese: function() {
        if (this.health > 0) {
          let nibble = 0;
          school.forEach(pet => {
            if (
              Math.sqrt((pet.x - this.x) ** 2) + Math.sqrt((pet.y - this.y) ** 2) <
                cheeseEatingThreshold
            ) {
              nibble++;
            }
          });
          this.health -= nibble;
          if (this.health <= 0) {
            this.cheese = globalRefs.cheeseDeath;
            setTimeout(() => {
              const index = cheeses.findIndex(cheese => cheese.id === this.id);
              cheeses.splice(index, 1);
              addPet({globalRefs, school, cheeses });
            }, 5000);
          }
        }
      }
    };
  
    id++;
    cheeses.push(newCheese);
  };

export default addCheese;