import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import Duder from './components/Duder';
import '../src/assets/styles/App.css';
import kill from './operations/kill';
import addFish from './operations/addFish';

import {
  cheese,
  cheeseDeath,
  skelly,
  dynamite,
  bck1,
  bck2,
  bck3,
  bck4,
  fishySteve
} from './assets';

import { fishes } from './constants/fishConstants';

import {
  fishTankSize,
  cheeseSize,
  cheeseEatingThreshold,
  dynamiteSize,
  dynamiteFallSpeed,
  frameRate,
  pointSize,
  dynamites,
  cheeses
} from './config';

let id = 1;
let globalRefs;
let school = [];
let theBackground;
let blowyUppy = false;

const addCheese = () => {
  const newCheese = {
    id: `cheese${id}`,
    type: 'cheese',
    cheese: globalRefs.cheese,
    health: 1000,
    x: Math.floor(Math.random() * (fishTankSize - cheeseSize)),
    y: Math.floor(Math.random() * (fishTankSize - cheeseSize)),
    size: pointSize,
    updateCheese: function() {
      if (this.health > 0) {
        let nibble = 0;
        school.forEach(fish => {
          if (
            Math.sqrt((fish.x - this.x) ** 2) + Math.sqrt((fish.y - this.y) ** 2) <
              cheeseEatingThreshold &&
            fish.type !== 'shark'
          ) {
            nibble++;
          }
        });
        this.health -= nibble;
        if (this.health <= 0) {
          this.cheese = globalRefs.cheeseDeath;
          setTimeout(() => {
            const index = cheeses.findIndex(cheese => cheese.id === this.id);
            cheeses.splice(index, 1);
            addFish({globalRefs, school });
          }, 5000);
        }
      }
    }
  };

  id++;
  cheeses.push(newCheese);
};



const backgrounds = [
  { src: bck1, type: 'bck1' },
  { src: bck2, type: 'bck2' },
  { src: bck3, type: 'bck3' },
  { src: bck4, type: 'bck4' }
];

const otherAssets = [
  { src: cheese, type: 'cheese' },
  { src: cheeseDeath, type: 'cheeseDeath' },
  { src: skelly, type: 'skelly' },
  { src: dynamite, type: 'dynamite' }
];

const buildImg = ({ src, type, size }) => (
  <img
    key={type}
    src={src}
    ref={type}
    style={{ display: 'none' }}
    alt={type}
    width={size}
    height={size}
  />
);

const fishFactory = () => fishes.map(fish => buildImg({ ...fish, size: 128 }));
const backgroundFactory = () =>
  backgrounds.map(background => buildImg({ ...background, size: 500 }));

const otherFactory = () => otherAssets.map(asset => buildImg({ ...asset, size: 128 }));

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
      addFish({ globalRefs, school, fishType: 'redFish' });
      addFish({ globalRefs, school, fishType: 'redFish' });
      addFish({ globalRefs, school, fishType: 'redFish' });
      addFish({ globalRefs, school, fishType: 'blueFish' });
      addFish({ globalRefs, school, fishType: 'blueFish' });
      addFish({ globalRefs, school, fishType: 'blueFish' });
      addFish({ globalRefs, school, fishType: 'greenFish' });
      addFish({ globalRefs, school, fishType: 'greenFish' });
      addFish({ globalRefs, school, fishType: 'greenFish' });
      addFish({ globalRefs, school, fishType: 'orangeFish' });
      addFish({ globalRefs, school, fishType: 'orangeFish' });
      addFish({ globalRefs, school, fishType: 'orangeFish' });
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
        addFish({globalRefs, school });
      }
    });
  };

  feedingFrenzy = () => {
    for (let index = 0; index < 30; index++) {
      addFish({globalRefs, school });
    }

    for (let index = 0; index < 9; index++) {
      addFish({ globalRefs, school, fishType: 'shark' });
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

          school.forEach(fish => kill(globalRefs, school, fish));
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
          <button onClick={addCheese}>Add Cheese</button>
          <button onClick={addFish({ globalRefs, school })}>Add a fish</button>
          <button
            onClick={() => {
              addFish({ globalRefs, school, fishType: 'shark' });
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
