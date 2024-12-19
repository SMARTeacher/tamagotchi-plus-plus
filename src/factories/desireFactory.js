import { 
    buildImg
} from './util';

import {
    desires
} from '../constants/fishConstants';

export const desireFactory = () => desires.map(desire => buildImg({ ...desire, size: 128 }));