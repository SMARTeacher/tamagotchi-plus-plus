import React, { Component } from 'react';

import {
  AddFish,
  AddShark,
  AddCheese,
  FeedingFrenzy,
  TenX
} from './buttons';

class HeaderUI extends Component {
    constructor(props) {
        super(props);    
    }

    render() {
        return (
          <header className="App-header">
            <h1 className="App-title" style={{ margin: 0 }}>
              A.I.quatic
            </h1>
            <AddCheese school={this.props.school} globalRefs={this.props.globalRefs} cheeses={this.props.cheeses} />
            <AddFish school={this.props.school} globalRefs={this.props.globalRefs} cheeses={this.props.cheeses} />
            <AddShark school={this.props.school} globalRefs={this.props.globalRefs} cheeses={this.props.cheeses} />
            <FeedingFrenzy school={this.props.school} globalRefs={this.props.globalRefs} cheeses={this.props.cheeses} />
            <TenX school={this.props.school} globalRefs={this.props.globalRefs} cheeses={this.props.cheeses} />
          </header>
        );
    }
}

export default HeaderUI;