import React, { Component } from 'react';

import {
    addFish
} from '../operations';

class AddShark extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blowyUppy: false
        };
    
    }

    addShark = () => {
        addFish({globalRefs: this.props.globalRefs, fishType: 'shark', school: this.props.school, cheeses: this.props.cheeses });
      };

    render() {
        return (
            <button onClick={this.addShark}>Add a Shark</button>
        );
    }
};

export default AddShark;
