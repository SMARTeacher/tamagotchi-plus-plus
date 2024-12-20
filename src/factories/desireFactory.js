import { 
    buildImg
} from './util';

import {
    desires
} from '../constants/petConstants';

export const desireFactory = () => desires.map(desire => buildImg({ ...desire, size: 128 }));