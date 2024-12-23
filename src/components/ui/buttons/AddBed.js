import React, { Component } from "react";

import { addBed } from "../../../operations";

class AddBed extends Component {
  render() {
    return <button onClick={addBed}>Add Bed</button>;
  }
}

export default AddBed;
