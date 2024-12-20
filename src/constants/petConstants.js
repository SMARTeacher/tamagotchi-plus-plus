import { redFish, blueFish, greenFish, orangeFish,
  food,
  sleep,
  coins,
  water
 } from "../assets";

const pets = [
  { src: redFish, type: "redFish" },
  { src: blueFish, type: "blueFish" },
  { src: greenFish, type: "greenFish" },
  { src: orangeFish, type: "orangeFish" },
];

const desires = [
  { src: food, type: "food" },
  { src: sleep, type: "sleep" },
  { src: coins, type: "coins" },
  { src: water, type: "water" },
];

const petTypes = pets.map((pet) => pet.type);

const petPersonalities = {
  redFish: [
    { type: "food", desirePoints: 40 },
    { type: "sleep", desirePoints: 10 },
    { type: "coins", desirePoints: 60 },
    { type: "water", desirePoints: 40 },
  ],
  blueFish: [
    { type: "food", desirePoints: 20 },
    { type: "sleep", desirePoints: 80 },
    { type: "coins", desirePoints: 50 },
    { type: "water", desirePoints: 10 },
  ],
  greenFish: [
    { type: "food", desirePoints: 100 },
    { type: "sleep", desirePoints: 30 },
    { type: "coins", desirePoints: 60 },
    { type: "water", desirePoints: 10 },
  ],
  orangeFish: [
    { type: "food", desirePoints: 30 },
    { type: "sleep", desirePoints: 70 },
    { type: "coins", desirePoints: 60 },
    { type: "water", desirePoints: 10 },
  ],
};

export { petTypes, petPersonalities, pets, desires };
