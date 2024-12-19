import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import Duder from './components/Duder';

import blueFish from '../src/assets/images/blueFish.png';
import cheese from '../src/assets/images/cheese.png';
import cheeseDeath from '../src/assets/images/cheeseDeath.png';
import greenFish from '../src/assets/images/greenFish.png';
import orangeFish from '../src/assets/images/orangeFish.png';
import redFish from '../src/assets/images/redFish.png';
import shark from '../src/assets/images/shark.png';
import skelly from '../src/assets/images/skelly.png';
import dynamite from '../src/assets/images/TNT.png';
import bck1 from '../src/assets/images/bck1.png';
import bck2 from '../src/assets/images/bck2.png';
import bck3 from '../src/assets/images/bck3.png';
import bck4 from '../src/assets/images/bck4.png';
import fishySteve from '../src/assets/images/FishermanSteve_Anim3.gif';
import '../src/assets/styles/App.css';

let id = 1;
let globalRefs;
const theDannyConstant = 1000;
let theBackground;
const school = [];
const fishThreshold = 10;

const frameRate = 30;
const cheeseSize = 80;
const sharkSpeed = 0.7;
const fishTankSize = 550;
const pointSize = 20;
const pointRadius = 50;
const fishWaitingPeriod = 20;
const sharkWaitingPeriod = 2;
const boredomRadius = 30;
const eatingThreshold = 50;
const dynamiteFallSpeed = 6;
const dynamiteSize = 150;
let blowyUppy = false;
const fishEatingThreshold = 50;
const cheeseEatingThreshold = 50;

const dynamites = [];

const cheeses = [];
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
            addFish({});
          }, 5000);
        }
      }
    }
  };

  id++;
  cheeses.push(newCheese);
};

const fishes = [
  { src: redFish, type: 'redFish' },
  { src: blueFish, type: 'blueFish' },
  { src: greenFish, type: 'greenFish' },
  { src: orangeFish, type: 'orangeFish' },
  { src: shark, type: 'shark' }
];

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

const fishTypes = fishes.map(fish => fish.type);

const fishPersonalities = {
  redFish: [
    { type: 'shark', likes: false },
    { type: 'cheese', likes: true },
    { type: 'redFish', likes: true }
    //    { type: 'greenFish', likes: false },
    //    { type: 'blueFish', likes: true }
  ],
  blueFish: [
    { type: 'shark', likes: false },
    { type: 'cheese', likes: false },
    { type: 'blueFish', likes: true }
  ],
  greenFish: [
    { type: 'shark', likes: false },
    { type: 'cheese', likes: true },
    { type: 'orangeFish', likes: true },
    { type: 'greenFish', likes: true }
  ],
  orangeFish: [
    { type: 'cheese', likes: true },
    { type: 'shark', likes: false },
    { type: 'orangeFish', likes: true }
  ],
  shark: [
    { type: 'blueFish', likes: true },
    { type: 'greenFish', likes: true },
    { type: 'redFish', likes: true },
    { type: 'orangeFish', likes: true }
  ]
};

const coinFlip = () => !!Math.floor(Math.random() * 2);

const getSmallDistance = () => Math.floor(Math.random() * pointRadius);

const clamp = (val, min, max) => {
  return Math.max(min, Math.min(val, max));
};

const kill = fish => {
  if (!fish.type !== 'skelly') {
    fish.fish = globalRefs.skelly;
    fish.type = 'skelly';
    fish.desireX = fish.x;
    fish.desireY = fish.y;
    fish.restingPeriod = 200000;
    setTimeout(() => {
      const index = school.findIndex(schoolFish => fish.id === schoolFish.id);
      if (index !== -1) {
        school.splice(index, 1);
      }
    }, 10000);
  }
};

const addFish = options => {
  if (school.length >= theDannyConstant) return;
  const { fishType: type } = options;
  //all types except shark
  const fishType = type || fishTypes[Math.floor(Math.random() * (fishTypes.length - 1))];
  const speedModifier = fishType === 'shark' ? sharkSpeed : 2;
  console.log('New Fish!');
  const newFish = {
    id: `${fishType}${id}`,
    fish: globalRefs[fishType],
    type: fishType,
    personality: fishPersonalities[fishType],
    x: Math.floor(Math.random() * (fishTankSize - (fishType === 'shark' ? 80 : 40))),
    y: Math.floor(Math.random() * (fishTankSize - (fishType === 'shark' ? 80 : 40))),
    desireX: 225,
    desireY: 225,
    restingPeriod: 0,
    size: fishType === 'shark' ? 80 : 40,
    speedModifier,
    isBored: function() {
      const xDiff = Math.abs(this.x - this.desireX);
      const yDiff = Math.abs(this.y - this.desireY);

      return this.restingPeriod === 0 && xDiff <= this.speedModifier && yDiff <= this.speedModifier;
    },
    fidget: function() {
      this.desireX = coinFlip() ? this.x + boredomRadius : this.x - boredomRadius;
      this.desireY = coinFlip() ? this.y + boredomRadius : this.y - boredomRadius;
      this.restingPeriod = this.type === 'shark' ? sharkWaitingPeriod : fishWaitingPeriod;
    },
    moveToDesire: function() {
      // X movement
      const moveX = this.desireX - this.x;
      if (Math.abs(moveX) > this.speedModifier) {
        moveX > 0 ? (this.x += this.speedModifier) : (this.x -= this.speedModifier);
      }

      // Y movement
      const moveY = this.desireY - this.y;
      if (Math.abs(moveY) > this.speedModifier) {
        moveY > 0 ? (this.y += this.speedModifier) : (this.y -= this.speedModifier);
      }
    },
    setNewDesire: function(canFidget = true) {
      //reset speed
      this.speedModifier = this.type === 'shark' ? sharkSpeed : 1;
      const closeFish = sortDesiresByDistance(this, school, cheeses).slice(0, fishThreshold);

      if (this.type === 'shark') {
        const closestFish = closeFish.filter(fish => fish.type !== 'cheese')[0];

        if (
          closestFish &&
          Math.sqrt((closestFish.x - this.x) ** 2) + Math.sqrt((closestFish.y - this.y) ** 2) <
            fishEatingThreshold
        ) {
          kill(closestFish);
        }
      }

      if (canFidget && coinFlip()) {
        this.fidget();
      } else {
        let desireObject;
        let desireMode;
        let index = 0;
        while (!desireObject && index < this.personality.length) {
          const currentFishCheck = this.personality[index];
          const foundDesire = closeFish.find(fish => fish.type === currentFishCheck.type);
          if (foundDesire) {
            desireObject = foundDesire;
            desireMode = currentFishCheck.likes;
          }
          index++;
        }

        if (desireObject) {
          // likes object
          if (desireMode === true) {
            this.desireX = coinFlip()
              ? desireObject.x + getSmallDistance()
              : desireObject.x - getSmallDistance();
            this.desireY = coinFlip()
              ? desireObject.y + getSmallDistance()
              : desireObject.y - getSmallDistance();
          } else if (desireMode === false) {
            // dislikes object
            this.speedModifier = 10;

            if (desireObject.x > 250 && desireObject.y > 250) {
              this.desireX = Math.floor(Math.random() * (fishTankSize / 4));
              this.desireY = Math.floor(Math.random() * (fishTankSize / 4));
            } else if (desireObject.x <= 250 && desireObject.y > 250) {
              this.desireX = Math.floor(Math.random() * (fishTankSize / 4)) + fishTankSize / 2;
              this.desireY = Math.floor(Math.random() * (fishTankSize / 4));
            } else if (desireObject.x > 250 && desireObject.y <= 250) {
              this.desireX = Math.floor(Math.random() * (fishTankSize / 4));
              this.desireY = Math.floor(Math.random() * (fishTankSize / 4)) + fishTankSize / 2;
            } else if (desireObject.x <= 250 && desireObject.y <= 250) {
              this.desireX = Math.floor(Math.random() * (fishTankSize / 4)) + fishTankSize / 2;
              this.desireY = Math.floor(Math.random() * (fishTankSize / 4)) + fishTankSize / 2;
            }
          }
        } else {
          this.fidget();
        }
      }

      this.desireX = clamp(this.desireX, 0, fishTankSize - this.size);
      this.desireY = clamp(this.desireY, 0, fishTankSize - this.size);
    }
  };
  id++;
  newFish.setNewDesire(false);
  school.push(newFish);
};

const sortDesiresByDistance = (fish, school, cheese) => {
  let desires = school
    .slice(0)
    .filter(val => val !== fish)
    .concat(cheese.slice(0));

  desires.forEach((val, index, array) => (array[index] = { x: val.x, y: val.y, source: val }));

  desires.sort((nodeA, nodeB) => {
    return (nodeA.x - fish.x) ** 2 + (nodeA.y - fish.y) ** 2 <
      (nodeB.x - fish.x) ** 2 + (nodeB.y - fish.y) ** 2
      ? -1
      : 1;
  });

  desires.forEach((val, index, array) => (array[index] = val.source));

  return desires;
};

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

class MoveTowardBehaviour {
  constructor(destination, fish, maxSpeed, acceleration, acceptanceRadius) {
    this.destination = destination;
    this.fish = fish;
    this.running = true;

    this.velocity = 0;
    this.maxSpeed = maxSpeed;
    this.acceleration = acceleration;
    this.acceptanceRadius = acceptanceRadius * Math.random();
  }

  update() {
    if (this.running) {
      this.moveTowardsTarget();
    }
  }

  moveTowardsTarget() {
    const delta = {
      x: this.destination.x - this.fish.x,
      y: this.destination.y - this.fish.y
    };
    const distance = Math.sqrt(delta.x ** 2 + delta.y ** 2);

    if (distance < this.acceptanceRadius) {
      this.velocity = 0;
      this.running = false;
    } else {
      const decelerationDistance = this.velocity ** 2 / (2 * this.acceleration);

      if (distance - this.acceptanceRadius > decelerationDistance) {
        this.velocity = Math.min(
          this.velocity + this.acceleration * (frameRate * 0.001),
          this.maxSpeed
        );
      } else {
        this.velocity = Math.max(this.velocity - this.acceleration * (frameRate * 0.001), 0);
      }

      const angle = Math.atan2(delta.y, delta.x);

      this.fish.x = Math.max(
        Math.min(
          this.fish.x + this.velocity * Math.cos(angle) * (frameRate * 0.001),
          fishTankSize - this.fish.size
        ),
        0
      );
      this.fish.y = Math.max(
        Math.min(
          this.fish.y + this.velocity * Math.sin(angle) * (frameRate * 0.001),
          fishTankSize - this.fish.size
        ),
        0
      );
    }
  }
}

class FidgetBehaviour extends MoveTowardBehaviour {
  constructor(distance, fish, maxSpeed, acceleration) {
    let directionVector = { x: 1.0, y: 0.0 };
    const theta = Math.random() * 360 * Math.PI / 180;
    const cosAngle = Math.cos(theta);
    const sinAngle = Math.sin(theta);

    directionVector.x = directionVector.x * cosAngle - directionVector.y * sinAngle;
    directionVector.y = directionVector.x * sinAngle + directionVector.y * cosAngle;

    super(
      {
        x: fish.x + directionVector.x * distance,
        y: fish.y + directionVector.y * distance
      },
      fish,
      maxSpeed,
      acceleration,
      0
    );
  }
}

class MoveAwayFromBehaviour extends MoveTowardBehaviour {
  constructor(fleeFrom, fish, maxSpeed, acceleration, fleeDistance) {
    super({ x: 0, y: 0 }, fish, maxSpeed, acceleration, 0);

    this.fleeFrom = fleeFrom;
    this.fleeDistance = fleeDistance;
  }

  update() {
    if (this.velocity === 0) {
      this.updateTarget();
    }
    this.moveTowardsTarget();
  }

  updateTarget() {
    const direction = this.getRandomDirectionVector();

    this.destination.x = this.fleeFrom.x + direction.x * this.fleeDistance;
    this.destination.y = this.fleeFrom.y + direction.y * this.fleeDistance;
  }

  getRandomDirectionVector() {
    let directionVector = { x: 1.0, y: 0.0 };
    const theta = Math.random() * 360 * Math.PI / 180;
    const cosAngle = Math.cos(theta);
    const sinAngle = Math.sin(theta);

    return {
      x: directionVector.x * cosAngle - directionVector.y * sinAngle,
      y: directionVector.x * sinAngle + directionVector.y * cosAngle
    };
  }
}

class FleeBehaviour extends MoveTowardBehaviour {
  constructor(fleeFrom, fish, maxSpeed, acceleration) {
    const fleeFromQuadrant = {
      x: fleeFrom.x < fishTankSize * 0.5 ? 0 : 1,
      y: fleeFrom.y < fishTankSize * 0.5 ? 0 : 1
    };

    let deltaX = Math.random() * (fishTankSize * 0.25);
    let deltaY = Math.random() * (fishTankSize * 0.25);

    super(
      {
        x: fleeFromQuadrant.x === 0 ? deltaX : fishTankSize - deltaX,
        y: fleeFromQuadrant.y === 0 ? deltaY : fishTankSize - deltaY
      },
      fish,
      maxSpeed,
      acceleration,
      0
    );
  }
}

class RestBehaviour {
  constructor(minDuration, maxDuration) {
    this.restDuration = minDuration + Math.random() * (maxDuration - minDuration);
    this.running = true;
  }

  update() {
    if (this.running) {
      this.restDuration -= frameRate * 0.001;
      if (this.restDuration < 0) {
        this.running = false;
      }
    }
  }
}

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
      addFish({ fishType: 'redFish' });
      addFish({ fishType: 'redFish' });
      addFish({ fishType: 'redFish' });
      addFish({ fishType: 'blueFish' });
      addFish({ fishType: 'blueFish' });
      addFish({ fishType: 'blueFish' });
      addFish({ fishType: 'greenFish' });
      addFish({ fishType: 'greenFish' });
      addFish({ fishType: 'greenFish' });
      addFish({ fishType: 'orangeFish' });
      addFish({ fishType: 'orangeFish' });
      addFish({ fishType: 'orangeFish' });
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
        addFish({});
      }
    });
  };

  feedingFrenzy = () => {
    for (let index = 0; index < 30; index++) {
      addFish({});
    }

    for (let index = 0; index < 9; index++) {
      addFish({ fishType: 'shark' });
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

          school.forEach(fish => kill(fish));
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
          <button onClick={addFish}>Add a fish</button>
          <button
            onClick={() => {
              addFish({ fishType: 'shark' });
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
