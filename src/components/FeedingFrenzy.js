import React, { Component } from 'react';

import {
  addFish
} from '../operations';

class FeedingFrenzy extends Component {
    constructor(props) {
        super(props);
    }

    feedingFrenzy = () => {
      for (let index = 0; index < 30; index++) {
        addFish({globalRefs: this.props.globalRefs, school: this.props.school, cheeses: this.props.cheeses });
      }
  
      for (let index = 0; index < 9; index++) {
        addFish({globalRefs: this.props.globalRefs, fishType: 'shark', school: this.props.school, cheeses: this.props.cheeses });
      }
    };

    render() {
        return (
            <button onClick={this.feedingFrenzy}>Feeding frenzy</button>
        );
    }
};

export default FeedingFrenzy;
