import React, { Component } from 'react';

import {
    addBed
} from '../../../operations';

class AddBed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blowyUppy: false
        };
    
    }

    addBed = () => {
        addBed({globalRefs: this.props.globalRefs, school: this.props.school, beds: this.props.beds });
      };

    render() {
        return (
            <button onClick={this.addBed}>Add Bed</button>
        );
    }
};

export default AddBed;
