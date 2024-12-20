import { pet_squawks, pet_charfoal, pet_pomprikle, pet_sprike,
  food,
  sleep,
  coins,
  water
 } from "../assets";

const pets = [
  { src: pet_squawks, type: "pet_squawks" },
  { src: pet_charfoal, type: "pet_charfoal" },
  { src: pet_pomprikle, type: "pet_pomprikle" },
  { src: pet_sprike, type: "pet_sprike" },
];

const desires = [
  { src: food, type: "food" },
  { src: sleep, type: "sleep" },
  { src: coins, type: "coins" },
  { src: water, type: "water" },
];

const petTypes = pets.map((pet) => pet.type);

const petPersonalities = {
  pet_squawks: [
    { type: "food", desirePoints: 40 },
    { type: "sleep", desirePoints: 10 },
    { type: "coins", desirePoints: 60 },
    { type: "water", desirePoints: 40 },
  ],
  pet_charfoal: [
    { type: "food", desirePoints: 20 },
    { type: "sleep", desirePoints: 80 },
    { type: "coins", desirePoints: 50 },
    { type: "water", desirePoints: 10 },
  ],
  pet_pomprikle: [
    { type: "food", desirePoints: 100 },
    { type: "sleep", desirePoints: 30 },
    { type: "coins", desirePoints: 60 },
    { type: "water", desirePoints: 10 },
  ],
  pet_sprike: [
    { type: "food", desirePoints: 30 },
    { type: "sleep", desirePoints: 70 },
    { type: "coins", desirePoints: 60 },
    { type: "water", desirePoints: 10 },
  ],
};

export { petTypes, petPersonalities, pets, desires };
