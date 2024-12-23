import React, { Component } from "react";

import { addBed } from "../../../operations";

class AddBed extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <button onClick={addBed}>Add Bed</button>;
  }
}

export default AddBed;
