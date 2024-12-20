import React, { Component } from 'react';

import {
    addPet
} from '../../../operations';

class AddPet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blowyUppy: false
        };
    
    }

    addPet = () => {
        addPet({globalRefs: this.props.globalRefs, school: this.props.school, cheeses: this.props.cheeses });
      };

    render() {
        return (
            <button onClick={this.addPet}>Add a Pet</button>
        );
    }
};

export default AddPet;
