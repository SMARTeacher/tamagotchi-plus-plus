import React, { Component } from 'react';

import {
    addPet
} from '../../../operations';

class TenX extends Component {
    constructor(props) {
        super(props);    
    }

    tenEx = () => {
      this.props.school.forEach(pet => {
        let index;
        for (index = 0; index < 9; index++) {
          addPet({globalRefs: this.props.globalRefs, school: this.props.school, cheeses: this.props.cheeses });
        }
      });
    };

    render() {
        return (
            <button onClick={this.tenEx}>10X the pets</button>
        );
    }
};

export default TenX;
