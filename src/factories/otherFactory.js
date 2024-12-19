import {
    buildImg,
    otherAssets
} from './util';

export const otherFactory = () => otherAssets.map(asset => buildImg({ ...asset, size: 128 }));