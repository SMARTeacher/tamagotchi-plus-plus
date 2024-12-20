import React, { Component } from "react";

import {
  pet_squawks,
  pet_charfoal,
  pet_sprike,
  pet_pomprikle,
  food,
  sleep,
  coins,
  water,
} from "../../assets";

const getPetOptions = () => {
  return [
    { img: pet_squawks, name: "pet_squawks" },
    { img: pet_charfoal, name: "pet_charfoal" },
    { img: pet_sprike, name: "pet_sprike" },
    { img: pet_pomprikle, name: "pet_pomprikle" },
  ].map((pet) => {
    return {
      value: pet.name,
      label: pet.name,
    };
  });
};

const assetsTemp = {
  pet_squawks,
  pet_charfoal,
  pet_sprike,
  pet_pomprikle,
};

class Select extends Component {
  state = {
    selectedOption: "pet_charfoal",
    menuOpen: false,
  };

  render() {
    console.log(this.state);
    return (
      <div>
        {!this.state.menuOpen && (
          <span
            style={{
              width: "50px",
              height: "50px",
            }}
            onClick={() => {
              this.setState({ menuOpen: !this.state.menuOpen });
            }}
          >
            <img
              src={assetsTemp[this.state.selectedOption]}
              style={{
                width: "50px",
                height: "50px",
                outline: "1px solid black",
                cursor: "pointer",
              }}
            />
          </span>
        )}

        {this.state.menuOpen && (
          <div height="100px" width="100px">
            <img
              src={pet_charfoal}
              style={{
                width: "50px",
                height: "50px",
                outline: "1px solid black",
                cursor: "pointer",
              }}
              onClick={() => {
                this.setState({
                  menuOpen: !this.state.menuOpen,
                  selectedOption: "pet_charfoal",
                });
              }}
            />
            <img
              src={pet_pomprikle}
              style={{
                width: "50px",
                height: "50px",
                outline: "1px solid black",
                cursor: "pointer",
              }}
              onClick={() => {
                this.setState({
                  menuOpen: !this.state.menuOpen,
                  selectedOption: "pet_pomprikle",
                });
              }}
            />
            <img
              src={pet_squawks}
              style={{
                width: "50px",
                height: "50px",
                outline: "1px solid black",
                cursor: "pointer",
              }}
              onClick={() => {
                this.setState({
                  menuOpen: !this.state.menuOpen,
                  selectedOption: "pet_squawks",
                });
              }}
            />
            <img
              src={pet_sprike}
              style={{
                width: "50px",
                height: "50px",
                outline: "1px solid black",
                cursor: "pointer",
              }}
              onClick={() => {
                this.setState({
                  menuOpen: !this.state.menuOpen,
                  selectedOption: "pet_sprike",
                });
              }}
            />
          </div>
        )}
      </div>
    );
  }
}

class IfBlock extends Component {
  state = {
    ifSelectedOption: "",
    isSelectedOption: "",
    thenSelectedOption: "",
  };

  render() {
    return (
      <span>
        IF{" "}
        <Select value={this.state.ifSelectedOption} options={getPetOptions()} />
        IS
        <select
          value={this.state.isSelectedOption}
          onChange={this.handleChange}
        >
          <option value="">Select an option</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
        THEN
        <select
          value={this.state.thenSelectedOption}
          onChange={this.handleChange}
        >
          <option value="">Select an option</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </span>
    );
  }
}

export default IfBlock;
