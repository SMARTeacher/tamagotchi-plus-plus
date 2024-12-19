import { redFish, blueFish, greenFish, orangeFish } from "../assets";

const fishes = [
  { src: redFish, type: "redFish" },
  { src: blueFish, type: "blueFish" },
  { src: greenFish, type: "greenFish" },
  { src: orangeFish, type: "orangeFish" },
];

const fishTypes = fishes.map((fish) => fish.type);

const fishPersonalities = {
  redFish: [
    { type: "cheese", desirePoints: 40 },
    { type: "redFish", desirePoints: 10 },
    { type: "greenFish", desirePoints: 10 },
    { type: "blueFish", desirePoints: 10 },
  ],
  blueFish: [
    { type: "cheese", desirePoints: 20 },
    { type: "blueFish", desirePoints: 20 },
    { type: "rest", desirePoints: 50 },
  ],
  greenFish: [
    { type: "cheese", desirePoints: 100 },
    { type: "orangeFish", desirePoints: 30 },
    { type: "greenFish", desirePoints: 60 },
  ],
  orangeFish: [
    { type: "cheese", desirePoints: 30 },
    { type: "orangeFish", desirePoints: 70 },
  ],
};

export { fishTypes, fishPersonalities, fishes };
