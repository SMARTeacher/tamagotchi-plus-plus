import {
    cheeseSize,
    petTankSize,
    pointSize,
    cheeseEatingThreshold,
} from '../config';

import { addPet } from './index';
import { cheeses, refs, school} from '../constants/state';

let id = 1;

const addCheese = () => {
    if (!refs.cheese) return;
    const newCheese = {
      id: `cheese${id}`,
      type: 'cheese',
      cheese: refs.cheese,
      health: 100,
      x: Math.floor(Math.random() * (petTankSize - cheeseSize)),
      y: Math.floor(Math.random() * (petTankSize - cheeseSize)),
      size: pointSize,
      updateCheese: function() {
        if (this.health > 0) {
          let nibble = 0;
          school.forEach(pet => {
            if (
              Math.sqrt((pet.x - this.x) ** 2) + Math.sqrt((pet.y - this.y) ** 2) <
                cheeseEatingThreshold && pet.currentDesireType === 'food'
            ) {
              nibble++;
            }
          });
          this.health -= nibble;
          if (this.health <= 0) {
            this.cheese = refs.cheeseDeath;
            setTimeout(() => {
              const index = cheeses.findIndex(cheese => cheese.id === this.id);
              cheeses.splice(index, 1);
              addPet();
            }, 5000);
          }
        }
      }
    };
  
    id++;
    cheeses.push(newCheese);
  };

export default addCheese;