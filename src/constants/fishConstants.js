import {
    redFish,
    blueFish,
    greenFish,
    orangeFish,
    shark
} from '../assets';

const fishes = [
  { src: redFish, type: 'redFish' },
  { src: blueFish, type: 'blueFish' },
  { src: greenFish, type: 'greenFish' },
  { src: orangeFish, type: 'orangeFish' },
  { src: shark, type: 'shark' }
];

const fishTypes = fishes.map(fish => fish.type);

const fishPersonalities = {
  redFish: [
    { type: 'shark', likes: false },
    { type: 'cheese', likes: true },
    { type: 'redFish', likes: true }
    //    { type: 'greenFish', likes: false },
    //    { type: 'blueFish', likes: true }
  ],
  blueFish: [
    { type: 'shark', likes: false },
    { type: 'cheese', likes: false },
    { type: 'blueFish', likes: true }
  ],
  greenFish: [
    { type: 'shark', likes: false },
    { type: 'cheese', likes: true },
    { type: 'orangeFish', likes: true },
    { type: 'greenFish', likes: true }
  ],
  orangeFish: [
    { type: 'cheese', likes: true },
    { type: 'shark', likes: false },
    { type: 'orangeFish', likes: true }
  ],
  shark: [
    { type: 'blueFish', likes: true },
    { type: 'greenFish', likes: true },
    { type: 'redFish', likes: true },
    { type: 'orangeFish', likes: true }
  ]
};

export { fishTypes, fishPersonalities, fishes };