import React, { Component } from 'react';

import {
    addBbq
} from '../../../operations';

class AddBbq extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blowyUppy: false
        };
    
    }

    addBbq = () => {
        addBbq({globalRefs: this.props.globalRefs, school: this.props.school, bbqs: this.props.bbqs });
      };

    render() {
        return (
            <button onClick={this.addBbq}>Add BBQ</button>
        );
    }
};

export default AddBbq;
