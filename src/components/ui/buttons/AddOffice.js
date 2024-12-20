import React, { Component } from 'react';

import {
    addOffice
} from '../../../operations';

class AddOffice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blowyUppy: false
        };
    
    }

    addOffice = () => {
        addOffice({globalRefs: this.props.globalRefs, school: this.props.school, offices: this.props.offices });
      };

    render() {
        return (
            <button onClick={this.addOffice}>Add Office</button>
        );
    }
};

export default AddOffice;
