import {
    bedSize,
    petTankSize,
    pointSize,
    bedEatingThreshold,
} from '../config';

import { refs, beds, school } from '../constants/state';

let id = 1;

const addBed = () => {
    if (!refs.bed) return;
    const newBed = {
      id: `bed${id}`,
      type: 'bed',
      bed: refs.bed,
      health: 100,
      x: Math.floor(Math.random() * (petTankSize - bedSize)),
      y: Math.floor(Math.random() * (petTankSize - bedSize)),
      size: pointSize,
      updateBed: function() {
        if (this.health > 0) {
          let nibble = 0;
          school.forEach(pet => {
            if (
              Math.sqrt((pet.x - this.x) ** 2) + Math.sqrt((pet.y - this.y) ** 2) <
              bedEatingThreshold && pet.currentDesireType === 'sleep'
            ) {
              nibble++;
            }
          });
          this.health -= nibble;
          if (this.health <= 0) {
            this.bed = refs.cheeseDeath;
            setTimeout(() => {
              const index = beds.findIndex(bed => bed.id === this.id);
              beds.splice(index, 1);
            }, 5000);
          }
        }
      }
    };
  
    id++;
    beds.push(newBed);
  };

export default addBed;