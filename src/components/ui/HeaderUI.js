import React, { Component } from 'react';

import {
  AddPet,
  AddCheese,
  TenX,
  AddBbq
} from './buttons';

class HeaderUI extends Component {
    render() {
        return (
          <header className="App-header">
            <h1 className="App-title" style={{ margin: 0 }}>
              Tamagotchi++
            </h1>
            <AddCheese school={this.props.school} globalRefs={this.props.globalRefs} cheeses={this.props.cheeses} />
            <AddBbq school={this.props.school} globalRefs={this.props.globalRefs} bbqs={this.props.bbqs} />
            <AddPet school={this.props.school} globalRefs={this.props.globalRefs} cheeses={this.props.cheeses} />
            <TenX school={this.props.school} globalRefs={this.props.globalRefs} cheeses={this.props.cheeses} />
          </header>
        );
    }
}

export default HeaderUI;