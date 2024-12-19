import { 
    buildImg,
    backgrounds 
} from './util';

export const backgroundFactory = () =>
    backgrounds.map(background => buildImg({ ...background, size: 500 }));