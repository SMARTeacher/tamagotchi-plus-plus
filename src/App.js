import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import {
  GoFish,
  Duder,
  Steve,
  TenX,
  FeedingFrenzy,
  AddShark
} from './components';

import '../src/assets/styles/App.css';
import {
  addFish,
  addCheese
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
  dynamiteSize,
  dynamiteFallSpeed,
  frameRate,
  dynamites,
} from './config';

let globalRefs;
let school = [];
let cheeses = [];
let theBackground;
class App extends Component {
  state = {
    interval: null,
    showSteve: false,
    turnOff: false
  };

  componentDidMount() {
    const blueFishRef = this.refs.blueFish;
    const greenFishRef = this.refs.greenFish;
    const redFishRef = this.refs.redFish;
    const orangeFishRef = this.refs.orangeFish;
    const sharkRef = this.refs.shark;
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
      sharkRef,
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
    if (this.state.showSteve) return;

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
    });

    dynamites.forEach(element => {
      if (element.y < element.targetY) {
        element.y += dynamiteFallSpeed;
      }

      element.rotation += 4;

      context.translate(element.x, element.y);
      context.rotate(element.rotation * (Math.PI / 180));
      context.drawImage(
        this.refs.dynamite,
        -dynamiteSize * 0.5,
        -dynamiteSize * 0.5,
        dynamiteSize,
        dynamiteSize
      );
      context.rotate(-element.rotation * (Math.PI / 180));
      context.translate(-element.x, -element.y);
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

  updateShowSteveState = (newState) => {
    this.setState({
      showSteve: newState
    });
  }

  render() {
    const { showSteve } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title" style={{ margin: 0 }}>
            A.I.quatic
          </h1>
          <button onClick={() => addCheese({ globalRefs, school, cheeses })}>Add Cheese</button>
          <button onClick={() => addFish({ globalRefs, school, cheeses })}>Add a fish</button>
          <AddShark school={school} globalRefs={globalRefs} cheeses={cheeses} />
          <FeedingFrenzy school={school} globalRefs={globalRefs} cheeses={cheeses} />
          <TenX school={school} globalRefs={globalRefs} cheeses={cheeses} />
          <GoFish school={school} globalRefs={globalRefs} updateShowSteveState={this.updateShowSteveState} />
        </header>
        {!showSteve && (
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
        )}
        {fishFactory()}
        {backgroundFactory()}
        {otherFactory()}
        {showSteve && (<Steve />)}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App)
