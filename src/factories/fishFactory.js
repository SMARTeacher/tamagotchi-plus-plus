import { 
    buildImg
} from './util';

import {
    fishes
} from '../constants/fishConstants';

export const fishFactory = () => fishes.map(fish => buildImg({ ...fish, size: 128 }));