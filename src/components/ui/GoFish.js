import React, { Component } from 'react';
import {
    dynamites,
    fishTankSize,
    dynamiteSize,

} from '../../config';

import {
    killFish
} from '../../operations';

class GoFish extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blowyUppy: false
        };
    
    }

    kaboom = () => {
        if (!this.blowyUppy) {
            this.props.updateShowSteveState(true);
            this.setState({ blowyUppy: true });
    
          setTimeout(() => {
            this.props.updateShowSteveState(false);
    
            const quadrants = (fishTankSize - dynamiteSize) / 7;
            for (let i = 0; i < 7; ++i) {
              dynamites.push({
                x: quadrants * i + quadrants * Math.random(),
                y: -dynamiteSize - Math.random() * 150,
                targetY: 200 + Math.random() * 150,
                rotation: Math.floor(Math.random() * 360)
              });
            }
    
            setTimeout(() => {   
              this.setState({ blowyUppy: false });
              this.props.school.forEach(fish => killFish(this.props.globalRefs, this.props.school, fish));
              dynamites.splice(0);
            }, 2500);
          }, 4000);
        }
      };

    render() {
        return (
            <button onClick={this.kaboom}>Go Fish</button>
        );
    }
};

export default GoFish;
