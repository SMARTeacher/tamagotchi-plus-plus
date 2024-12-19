import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import {
  Duder,
  HeaderUI
} from './components';

import '../src/assets/styles/App.css';
import {
  addFish,
} from './operations';



import { fishes } from './constants/fishConstants';

import {
  fishFactory,
  backgroundFactory,
  otherFactory
} from './factories';

import {
  fishTankSize,
  cheeseSize,
  frameRate,
} from './config';

let globalRefs;
let school = [];
let cheeses = [];
let theBackground;
const speechBubbleBaseSize = 40;

class App extends Component {
  state = {
    interval: null,
    turnOff: false
  };

  componentDidMount() {
    const blueFishRef = this.refs.blueFish;
    const greenFishRef = this.refs.greenFish;
    const redFishRef = this.refs.redFish;
    const orangeFishRef = this.refs.orangeFish;
    const cheeseRef = this.refs.cheese;
    const skellyRef = this.refs.skelly;
    const cheeseDeathRef = this.refs.cheeseDeath;
    const bck1Ref = this.refs.bck1;
    const bck2Ref = this.refs.bck2;
    const bck3Ref = this.refs.bck3;
    const bck4Ref = this.refs.bck4;
    globalRefs = this.refs;
    Promise.all([
      blueFishRef,
      greenFishRef,
      redFishRef,
      orangeFishRef,
      cheeseRef,
      skellyRef,
      cheeseDeathRef,
      bck1Ref,
      bck2Ref,
      bck3Ref,
      bck4Ref
    ]).then(() => {
      addFish({ globalRefs, school, fishType: 'redFish', cheeses });
      addFish({ globalRefs, school, fishType: 'redFish', cheeses });
      addFish({ globalRefs, school, fishType: 'redFish', cheeses });
      addFish({ globalRefs, school, fishType: 'blueFish', cheeses });
      addFish({ globalRefs, school, fishType: 'blueFish', cheeses });
      addFish({ globalRefs, school, fishType: 'blueFish', cheeses });
      addFish({ globalRefs, school, fishType: 'greenFish', cheeses });
      addFish({ globalRefs, school, fishType: 'greenFish', cheeses });
      addFish({ globalRefs, school, fishType: 'greenFish', cheeses });
      addFish({ globalRefs, school, fishType: 'orangeFish', cheeses });
      addFish({ globalRefs, school, fishType: 'orangeFish', cheeses });
      addFish({ globalRefs, school, fishType: 'orangeFish', cheeses });
      theBackground = globalRefs[`bck${Math.floor(Math.random() * 4) + 1}`];
      this.startTheFish();
    });
  }

  drawAllFish() {
    const canvas = this.refs.canvas;
    const context = canvas.getContext('2d');
    context.drawImage(theBackground, 0, 0, canvas.width, canvas.height);

    if (this.state.turnOff) return;
    // Cheese
    cheeses.forEach(cheese => {
      cheese.updateCheese();
      context.drawImage(cheese.cheese, cheese.x, cheese.y, cheeseSize, cheeseSize);
    });

    school.forEach(fish => {
      if (fish.restingPeriod !== 0) fish.restingPeriod--;
      if (!fish.isBored()) {
        fish.moveToDesire();
      } else {
        fish.setNewDesire();
      }

      context.drawImage(fish.fish, fish.x, fish.y, fish.size, fish.size);
      if(globalRefs[fish.currentDesireType]){
        context.drawImage(globalRefs.speechBubble, fish.x + 40, fish.y - 15, speechBubbleBaseSize, speechBubbleBaseSize)
        context.drawImage(globalRefs[fish.currentDesireType], fish.x + 50, fish.y - 10, speechBubbleBaseSize /2 , speechBubbleBaseSize /2 )
      }
    });
  }

  startTheFish = () => {
    const { interval } = this.state;
    if (!interval) {
      const interval = setInterval(() => {
        this.drawAllFish();
      }, frameRate);

      this.setState({ interval });
    }
  };

  stopTheFish = () => {
    clearInterval(this.state.interval);
    this.setState({ interval: null });
  };

  render() {
    return (
      <div className="App">
        <HeaderUI globalRefs={globalRefs} school={school} cheeses={cheeses} />
          <div>
            <div style={{ height: '50px' }}>
              {fishes.map(fish => <Duder key={fish.type} {...fish} />)}
            </div>
            <canvas
              ref="canvas"
              height={fishTankSize}
              width={fishTankSize}
              style={{ border: '1px solid #000' }}
            />
          </div>
        {fishFactory()}
        {backgroundFactory()}
        {otherFactory()}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App)
