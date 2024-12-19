import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import Duder from './components/Duder';
import '../src/assets/styles/App.css';
import {
  addFish,
  addCheese,
  killFish
} from './operations';

import {
  fishySteve
} from './assets';

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
let blowyUppy = false;
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

  tenEx = () => {
    school.forEach(fish => {
      let index;
      for (index = 0; index < 9; index++) {
        addFish({globalRefs, school, cheeses });
      }
    });
  };

  feedingFrenzy = () => {
    for (let index = 0; index < 30; index++) {
      addFish({globalRefs, school, cheeses });
    }

    for (let index = 0; index < 9; index++) {
      addFish({ globalRefs, school, fishType: 'shark', cheeses });
    }
  };

  kaboom = () => {
    if (!blowyUppy) {
      this.setState({
        showSteve: true
      });

      setTimeout(() => {
        blowyUppy = true;

        this.setState({
          showSteve: false
        });

        const quadrants = (fishTankSize - dynamiteSize) / 7;
        for (let i = 0; i < 7; ++i) {
          dynamites.push({
            x: quadrants * i + quadrants * Math.random(),
            y: -dynamiteSize - Math.random() * 150,
            targetY: 200 + Math.random() * 150,
            rotation: Math.floor(Math.random() * 360)
          });
        }

        setTimeout(function() {
          blowyUppy = false;

          school.forEach(fish => killFish(globalRefs, school, fish));
          dynamites.splice(0);
        }, 2500);
      }, 4000);
    }
  };

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
          <button
            onClick={() => {
              addFish({ globalRefs, school, fishType: 'shark', cheeses });
            }}
          >
            Add a Shark
          </button>
          <button onClick={this.feedingFrenzy}>Feeding frenzy</button>
          <button onClick={this.tenEx}>10X the fish</button>
          <button onClick={this.kaboom}>Go Fish</button>
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
        {showSteve && (
          <img
            src={fishySteve}
            ref="fishySteve"
            alt="fishySteve"
            width={fishTankSize}
            height={fishTankSize}
          />
        )}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App)
