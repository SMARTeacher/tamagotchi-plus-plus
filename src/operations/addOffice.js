import {
    officeSize,
    petTankSize,
    pointSize,
    officeEatingThreshold,
} from '../config';

import { addPet } from './index';

let id = 1;

const addOffice = options => {
    const { globalRefs, school, offices, cheeses } = options;
    if (globalRefs === undefined) return;
    const newOffice = {
      id: `office${id}`,
      type: 'office',
      offices: globalRefs.offices,
      health: 1000,
      x: Math.floor(Math.random() * (petTankSize - officeSize)),
      y: Math.floor(Math.random() * (petTankSize - officeSize)),
      size: pointSize,
      updateOffice: function() {
        if (this.health > 0) {
          let nibble = 0;
          school.forEach(pet => {
            if (
              Math.sqrt((pet.x - this.x) ** 2) + Math.sqrt((pet.y - this.y) ** 2) <
              officeEatingThreshold
            ) {
              nibble++;
            }
          });
          this.health -= nibble;
          if (this.health <= 0) {
            this.office = globalRefs.officeDeath;
            setTimeout(() => {
              const index = offices.findIndex(office => office.id === this.id);
              offices.splice(index, 1);
              addPet({globalRefs, school, cheeses, offices });
            }, 5000);
          }
        }
      }
    };
  
    id++;
    offices.push(newOffice);
  };

export default addOffice;