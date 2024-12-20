import {
    bedSize,
    petTankSize,
    pointSize,
    bedEatingThreshold,
} from '../config';

import { addPet } from './index';

let id = 1;

const addBed = options => {
    const { globalRefs, school, beds, cheeses } = options;
    if (globalRefs === undefined) return;
    const newBed = {
      id: `bed${id}`,
      type: 'bed',
      bed: globalRefs.bed,
      health: 1000,
      x: Math.floor(Math.random() * (petTankSize - bedSize)),
      y: Math.floor(Math.random() * (petTankSize - bedSize)),
      size: pointSize,
      updateBed: function() {
        if (this.health > 0) {
          let nibble = 0;
          school.forEach(pet => {
            if (
              Math.sqrt((pet.x - this.x) ** 2) + Math.sqrt((pet.y - this.y) ** 2) <
              bedEatingThreshold
            ) {
              nibble++;
            }
          });
          this.health -= nibble;
          if (this.health <= 0) {
            this.bed = globalRefs.bedDeath;
            setTimeout(() => {
              const index = beds.findIndex(bed => bed.id === this.id);
              beds.splice(index, 1);
              addPet({globalRefs, school, cheeses, beds });
            }, 5000);
          }
        }
      }
    };
  
    id++;
    beds.push(newBed);
  };

export default addBed;