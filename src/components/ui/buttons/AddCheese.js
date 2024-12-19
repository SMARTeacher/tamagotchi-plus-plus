import React, { Component } from 'react';

import {
    addCheese
} from '../../../operations';

class AddCheese extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blowyUppy: false
        };
    
    }

    addCheese = () => {
        addCheese({globalRefs: this.props.globalRefs, school: this.props.school, cheeses: this.props.cheeses });
      };

    render() {
        return (
            <button onClick={this.addCheese}>Add Cheese</button>
        );
    }
};

export default AddCheese;
