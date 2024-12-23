import React, { Component } from "react";
import Select from "./Select";

import {
  pet_squawks,
  pet_charfoal,
  pet_sprike,
  pet_pomprikle,
  food,
  sleep,
  coins,
  water,
  cheese,
  bed,
} from "../../assets";

const getPetOptions = () => {
  return [
    { img: pet_squawks, name: "pet_squawks" },
    { img: pet_charfoal, name: "pet_charfoal" },
    { img: pet_sprike, name: "pet_sprike" },
    { img: pet_pomprikle, name: "pet_pomprikle" },
  ];
};

const getDesireOptions = () => {
  return [
    { img: food, name: "food" },
    { img: sleep, name: "sleep" },
    { img: coins, name: "coins" },
    { img: water, name: "water" },
  ];
};

const getActionOptions = () => {
  return [
    { img: cheese, name: "cheese" },
    { img: bed, name: "sleep" },
  ];
};

class IfBlock extends Component {
  state = {
    selectedPet: null,
  };

  render() {
    return (
      <span
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <strong style={{ width: "50px" }}>IF</strong>
        <Select
          options={getPetOptions()}
          onSelect={(option) => {
            this.props.command.petName = option.name;
          }}
        />
        <strong style={{ width: "50px" }}>IS</strong>
        <Select
          options={getDesireOptions()}
          onSelect={(option) => {
            this.props.command.desireName = option.name;
          }}
        />
        <strong style={{ width: "50px" }}>THEN</strong>
        <Select
          options={getActionOptions()}
          onSelect={(option) => {
            this.props.command.actionName = option.name;
          }}
        />
      </span>
    );
  }
}

export default IfBlock;
