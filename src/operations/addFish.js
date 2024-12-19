import { fishTypes, fishPersonalities } from "../constants/fishConstants";

import {
  fishTankSize,
  boredomRadius,
  fishWaitingPeriod,
  fishThreshold,
  theDannyConstant,
} from "../config";
import {
  coinFlip,
  sortDesiresByDistance,
  getSmallDistance,
  clamp,
} from "./helpers";

let id = 1;

const addFish = (options) => {
  const { school, globalRefs, fishType: type, cheeses } = options;
  if (school.length >= theDannyConstant) return;
  if (globalRefs === undefined) return;
  //all types
  const fishType =
    type || fishTypes[Math.floor(Math.random() * (fishTypes.length - 1))];
  const speedModifier = 2;
  console.log("New Fish!");
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
      this.restingPeriod = fishWaitingPeriod;
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

      this.desireX = clamp(this.desireX, 0, fishTankSize - this.size);
      this.desireY = clamp(this.desireY, 0, fishTankSize - this.size);
    },
  };
  id++;
  newFish.setNewDesire(false);
  school.push(newFish);
};

export default addFish;
