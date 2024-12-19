import { fishTypes, fishPersonalities } from '../constants/fishConstants';

import {
    fishTankSize,
    boredomRadius,
    fishWaitingPeriod,
    fishThreshold,
    theDannyConstant,
} from '../config';
import {
    coinFlip,
    sortDesiresByDistance,
    getSmallDistance,
    clamp,
} from './helpers';

let id = 1;

const addFish = options => {
  const { school, globalRefs, fishType: type, cheeses } = options;
  if (school.length >= theDannyConstant) return;
  if (globalRefs === undefined) return;
  //all types
  const fishType = type || fishTypes[Math.floor(Math.random() * (fishTypes.length - 1))];
  const speedModifier = 2;
  console.log('New Fish!');
  const newFish = {
    id: `${fishType}${id}`,
    fish: globalRefs[fishType],
    type: fishType,
    personality: fishPersonalities[fishType],
    x: Math.floor(Math.random() * (fishTankSize - 40)),
    y: Math.floor(Math.random() * (fishTankSize - 40)),
    desireX: 225,
    desireY: 225,
    currentDesireType: null,
    restingPeriod: 0,
    size: 40,
    speedModifier,
    isBored: function() {
      const xDiff = Math.abs(this.x - this.desireX);
      const yDiff = Math.abs(this.y - this.desireY);

      return this.restingPeriod === 0 && xDiff <= this.speedModifier && yDiff <= this.speedModifier;
    },
    fidget: function() {
      this.desireX = coinFlip() ? this.x + boredomRadius : this.x - boredomRadius;
      this.desireY = coinFlip() ? this.y + boredomRadius : this.y - boredomRadius;
      this.restingPeriod = fishWaitingPeriod;
    },
    moveToDesire: function() {
      // X movement
      const moveX = this.desireX - this.x;
      if (Math.abs(moveX) > this.speedModifier) {
        moveX > 0 ? (this.x += this.speedModifier) : (this.x -= this.speedModifier);
      }

      // Y movement
      const moveY = this.desireY - this.y;
      if (Math.abs(moveY) > this.speedModifier) {
        moveY > 0 ? (this.y += this.speedModifier) : (this.y -= this.speedModifier);
      }
    },
    setNewDesire: function(canFidget = true) {
      //reset speed
      this.speedModifier = 1;
      const closeFish = sortDesiresByDistance(this, school, cheeses).slice(0, fishThreshold);

      if (canFidget && coinFlip()) {
        this.fidget();
      } else {
        let desireObject;
        let desireMode;
        let index = 0;
        while (!desireObject && index < this.personality.length) {
          const currentFishCheck = this.personality[index];
          const foundDesire = closeFish.find(fish => fish.type === currentFishCheck.type);
          if (foundDesire) {
            desireObject = foundDesire;
            desireMode = currentFishCheck.likes;
          }
          index++;
        }

        if (desireObject) {
          // likes object
          if (desireMode === true) {
            this.currentDesireType = desireObject.type;
            
            this.desireX = coinFlip()
              ? desireObject.x + getSmallDistance()
              : desireObject.x - getSmallDistance();
            this.desireY = coinFlip()
              ? desireObject.y + getSmallDistance()
              : desireObject.y - getSmallDistance();
          } else if (desireMode === false) {
            // dislikes object
            this.speedModifier = 10;

            if (desireObject.x > 250 && desireObject.y > 250) {
              this.desireX = Math.floor(Math.random() * (fishTankSize / 4));
              this.desireY = Math.floor(Math.random() * (fishTankSize / 4));
            } else if (desireObject.x <= 250 && desireObject.y > 250) {
              this.desireX = Math.floor(Math.random() * (fishTankSize / 4)) + fishTankSize / 2;
              this.desireY = Math.floor(Math.random() * (fishTankSize / 4));
            } else if (desireObject.x > 250 && desireObject.y <= 250) {
              this.desireX = Math.floor(Math.random() * (fishTankSize / 4));
              this.desireY = Math.floor(Math.random() * (fishTankSize / 4)) + fishTankSize / 2;
            } else if (desireObject.x <= 250 && desireObject.y <= 250) {
              this.desireX = Math.floor(Math.random() * (fishTankSize / 4)) + fishTankSize / 2;
              this.desireY = Math.floor(Math.random() * (fishTankSize / 4)) + fishTankSize / 2;
            }
          }
        } else {
          this.fidget();
        }
      }

      this.desireX = clamp(this.desireX, 0, fishTankSize - this.size);
      this.desireY = clamp(this.desireY, 0, fishTankSize - this.size);
    }
  };
  id++;
  newFish.setNewDesire(false);
  school.push(newFish);
};

export default addFish;
