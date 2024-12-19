import React from 'react';
import {
    cheese,
    cheeseDeath,
    skelly,
    dynamite,
    bck1,
    bck2,
    bck3,
    bck4,
    speechBubble
  } from '../assets';

const backgrounds = [
  { src: bck1, type: 'bck1' },
  { src: bck2, type: 'bck2' },
  { src: bck3, type: 'bck3' },
  { src: bck4, type: 'bck4' }
];

const otherAssets = [
  { src: cheese, type: 'cheese' },
  { src: cheeseDeath, type: 'cheeseDeath' },
  { src: skelly, type: 'skelly' },
  { src: dynamite, type: 'dynamite' },
  { src: speechBubble, type: 'speechBubble' }
];

const buildImg = ({ src, type, size }) => (
  <img
    key={type}
    src={src}
    ref={type}
    style={{ display: 'none' }}
    alt={type}
    width={size}
    height={size}
  />
);

export {
    backgrounds,
    otherAssets,
    buildImg
};