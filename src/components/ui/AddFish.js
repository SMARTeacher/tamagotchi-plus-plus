import React, { Component } from 'react';

import {
    addFish
} from '../../operations';

class AddFish extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blowyUppy: false
        };
    
    }

    addFish = () => {
        addFish({globalRefs: this.props.globalRefs, school: this.props.school, cheeses: this.props.cheeses });
      };

    render() {
        return (
            <button onClick={this.addFish}>Add a Fish</button>
        );
    }
};

export default AddFish;
