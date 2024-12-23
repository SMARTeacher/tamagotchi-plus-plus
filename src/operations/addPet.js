import { petTypes, petPersonalities, desires } from "../constants/petConstants";

import {
  petTankSize,
  boredomRadius,
  petWaitingPeriod,
  theDannyConstant,
} from "../config";
import { coinFlip, clamp, getRandomElement } from "./helpers";
import { refs, beds, cheeses, school } from "../constants/state";

let id = 1;
const getRandomSafeCoord = () => Math.floor(Math.random() * (petTankSize - 40));

const addPet = (options = {}) => {
  const { petType: type } = options;

  //all types
  const petType =
    type || petTypes[Math.floor(Math.random() * (petTypes.length - 1))];

  if (school.length >= theDannyConstant) return;
  if (!refs[petType]) return;

  const newPet = {
    id: `${petType}${id}`,
    pet: refs[petType],
    type: petType,
    personality: petPersonalities[petType],
    x: getRandomSafeCoord(),
    y: getRandomSafeCoord(),
    desireX: getRandomSafeCoord(),
    desireY: getRandomSafeCoord(),
    currentDesireType: null,
    restingPeriod: 0,
    size: 75,
    health: 200,
    speedModifier: 2, // this is stupidly named its more like "acceptably close to desire radius"
    isDead: function () {
      return this.health <= 0;
    },
    modifyHealth: function (amount) {
      this.health = clamp(this.health + amount, 0, 250);
    },
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

        this.modifyHealth(-1);
      } else {
        if (this.currentDesireType !== null) {
          this.modifyHealth(1);
        }
      }

      // Y movement
      const moveY = this.desireY - this.y;
      if (Math.abs(moveY) > this.speedModifier) {
        moveY > 0
          ? (this.y += this.speedModifier)
          : (this.y -= this.speedModifier);

        this.modifyHealth(-1);
      } else {
        if (this.currentDesireType !== null) {
          this.modifyHealth(1);
        }
      }
    },
    updatePet: function () {
      if (this.restingPeriod !== 0) this.restingPeriod--;
      if (!this.isBored()) {
        this.moveToDesire();
      } else {
        if (coinFlip() && coinFlip()) {
          // just hang out
          this.currentDesireType = null;
          this.fidget();
        } else {
          this.setNewDesire();
        }
      }
    },
    setNewDesire: function (canFidget = true) {
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
            this.setDesireObj();

            break;
          }
        }
      }
    },

    setDesireObj: function () {
      let objs = [];
      if (this.currentDesireType === "food") {
        objs = cheeses;
      } else if (this.currentDesireType === "sleep") {
        objs = beds;
      }

      if (objs.length === 0) return;
      const obj = getRandomElement(objs);
      this.desireX = clamp(obj.x, 0, petTankSize - this.size);
      this.desireY = clamp(obj.y, 0, petTankSize - this.size);
    },
  };
  id++;
  newPet.setNewDesire(false);
  school.push(newPet);
};

export default addPet;
