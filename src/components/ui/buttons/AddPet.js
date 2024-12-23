import React, { Component } from "react";

import { addPet } from "../../../operations";

class AddPet extends Component {
  render() {
    return <button onClick={addPet}>Add a Pet</button>;
  }
}

export default AddPet;
