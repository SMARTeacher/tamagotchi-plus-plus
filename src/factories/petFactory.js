import { 
    buildImg
} from './util';

import {
    pets
} from '../constants/petConstants';

export const petFactory = () => pets.map(pet => buildImg({ ...pet, size: 128 }));