import React, { Component } from "react";

import { addPet } from "../../../operations";
import { school } from "../../../constants/state";

class TenX extends Component {
  tenEx = () => {
    school.forEach((pet) => {
      let index;
      for (index = 0; index < 9; index++) {
        addPet();
      }
    });
  };

  render() {
    return <button onClick={this.tenEx}>10X the pets</button>;
  }
}

export default TenX;
