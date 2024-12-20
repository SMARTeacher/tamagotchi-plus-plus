import { 
    buildImg
} from './util';

import {
    objectsOfDesire
} from '../constants/petConstants';

export const objectOfDesire = () => objectsOfDesire.map(ood => buildImg({ ...ood, size: 128 }));