import { petTypes, petPersonalities } from "../constants/petConstants";

import {
  petTankSize,
  boredomRadius,
  petWaitingPeriod,
  theDannyConstant,
} from "../config";
import {
  coinFlip,
  clamp,
} from "./helpers";

let id = 1;

const addPet = (options) => {
  const { school, globalRefs, petType: type, cheeses } = options;
  if (school.length >= theDannyConstant) return;
  if (globalRefs === undefined) return;
  //all types
  const petType =
    type || petTypes[Math.floor(Math.random() * (petTypes.length - 1))];
  const speedModifier = 2;
  console.log("New pet!");
  const newPet = {
    id: `${petType}${id}`,
    pet: globalRefs[petType],
    type: petType,
    personality: petPersonalities[petType],
    x: Math.floor(Math.random() * (petTankSize - 40)),
    y: Math.floor(Math.random() * (petTankSize - 40)),
    desireX: 225,
    desireY: 225,
    currentDesireType: null,
    restingPeriod: 0,
    size: 75,
    speedModifier,
    isBored: function () {
      const xDiff = Math.abs(this.x - this.desireX);
      const yDiff = Math.abs(this.y - this.desireY);

      return (
        this.restingPeriod === 0 &&
        xDiff <= this.speedModifier &&
        yDiff <= this.speedModifier
      );
    },
    fidget: function () {
      this.desireX = coinFlip()
        ? this.x + boredomRadius
        : this.x - boredomRadius;
      this.desireY = coinFlip()
        ? this.y + boredomRadius
        : this.y - boredomRadius;
      this.restingPeriod = petWaitingPeriod;
    },
    moveToDesire: function () {
      // X movement
      const moveX = this.desireX - this.x;
      if (Math.abs(moveX) > this.speedModifier) {
        moveX > 0
          ? (this.x += this.speedModifier)
          : (this.x -= this.speedModifier);
      }

      // Y movement
      const moveY = this.desireY - this.y;
      if (Math.abs(moveY) > this.speedModifier) {
        moveY > 0
          ? (this.y += this.speedModifier)
          : (this.y -= this.speedModifier);
      }
    },
    setNewDesire: function (canFidget = true) {
      //reset speed
      this.speedModifier = 1;

      if (canFidget && coinFlip()) {
        this.fidget();
      } else {
        const totalDesirePoints = this.personality.reduce(
          (prev, curr) => prev + curr.desirePoints,
          0
        );
        const desireRoll = Math.ceil(Math.random() * totalDesirePoints);
        let sum = 0;
        for (let personalityRow of this.personality) {
          sum += personalityRow.desirePoints;
          if (sum - desireRoll >= 0) {
            this.currentDesireType = personalityRow.type;
            break;
          }
        }
      }

      this.desireX = clamp(this.desireX, 0, petTankSize - this.size);
      this.desireY = clamp(this.desireY, 0, petTankSize - this.size);
    },
  };
  id++;
  newPet.setNewDesire(false);
  school.push(newPet);
};

export default addPet;
