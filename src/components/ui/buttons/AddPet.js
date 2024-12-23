import React, { Component } from "react";

import { addPet } from "../../../operations";

class AddPet extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <button onClick={addPet}>Add a Pet</button>;
  }
}

export default AddPet;
