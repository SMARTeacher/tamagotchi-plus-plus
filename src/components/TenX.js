import React, { Component } from 'react';

import {
    addFish
} from '../operations';

class TenX extends Component {
    constructor(props) {
        super(props);    
    }

    tenEx = () => {
      this.props.school.forEach(fish => {
        let index;
        for (index = 0; index < 9; index++) {
          addFish({globalRefs: this.props.globalRefs, school: this.props.school, cheeses: this.props.cheeses });
        }
      });
    };

    render() {
        return (
            <button onClick={this.tenEx}>10X the fish</button>
        );
    }
};

export default TenX;
