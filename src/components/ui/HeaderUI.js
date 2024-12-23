import React, { Component } from "react";

import { AddPet, AddCheese, TenX, AddBed } from "./buttons";

class HeaderUI extends Component {
  render() {
    return (
      <header className="App-header">
        <h1 className="App-title" style={{ margin: 0 }}>
          Tamagotchi++
        </h1>
        <AddCheese />
        <AddBed />
        <AddPet />
        <TenX />
      </header>
    );
  }
}

export default HeaderUI;
