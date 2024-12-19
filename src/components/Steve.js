import React, { Component } from 'react';

import {
    fishySteve
  } from '../assets';

import {
    fishTankSize
  } from '../config';

class Steve extends Component {
    render() {
        return (
            <img
            src={fishySteve}
            ref="fishySteve"
            alt="fishySteve"
            width={fishTankSize}
            height={fishTankSize}
          />
        );
    }
}

export default Steve;