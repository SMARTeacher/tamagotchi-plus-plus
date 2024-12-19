import {
    cheeseSize,
    fishTankSize,
    pointSize,
    cheeseEatingThreshold,
} from '../config';

import { addFish } from './index';

let id = 1;

const addCheese = options => {
    const { globalRefs, school, cheeses } = options;
    if (globalRefs === undefined) return;
    const newCheese = {
      id: `cheese${id}`,
      type: 'cheese',
      cheese: globalRefs.cheese,
      health: 1000,
      x: Math.floor(Math.random() * (fishTankSize - cheeseSize)),
      y: Math.floor(Math.random() * (fishTankSize - cheeseSize)),
      size: pointSize,
      updateCheese: function() {
        if (this.health > 0) {
          let nibble = 0;
          school.forEach(fish => {
            if (
              Math.sqrt((fish.x - this.x) ** 2) + Math.sqrt((fish.y - this.y) ** 2) <
                cheeseEatingThreshold &&
              fish.type !== 'shark'
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
              addFish({globalRefs, school });
            }, 5000);
          }
        }
      }
    };
  
    id++;
    cheeses.push(newCheese);
  };

export default addCheese;