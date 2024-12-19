import {
    redFish,
    blueFish,
    greenFish,
    orangeFish,
} from '../assets';

const fishes = [
  { src: redFish, type: 'redFish' },
  { src: blueFish, type: 'blueFish' },
  { src: greenFish, type: 'greenFish' },
  { src: orangeFish, type: 'orangeFish' },
];

const fishTypes = fishes.map(fish => fish.type);

const fishPersonalities = {
  redFish: [
    { type: 'cheese', likes: true },
    { type: 'redFish', likes: true }
    //    { type: 'greenFish', likes: false },
    //    { type: 'blueFish', likes: true }
  ],
  blueFish: [
    { type: 'cheese', likes: false },
    { type: 'blueFish', likes: true }
  ],
  greenFish: [
    { type: 'cheese', likes: true },
    { type: 'orangeFish', likes: true },
    { type: 'greenFish', likes: true }
  ],
  orangeFish: [
    { type: 'cheese', likes: true },
    { type: 'orangeFish', likes: true }
  ],
};

export { fishTypes, fishPersonalities, fishes };