import React, { Component } from "react";

import { addCheese } from "../../../operations";

class AddCheese extends Component {
  render() {
    return <button onClick={addCheese}>Add Cheese</button>;
  }
}

export default AddCheese;
