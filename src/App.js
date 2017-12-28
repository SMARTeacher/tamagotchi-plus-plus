import React, { Component } from 'react';
import blueFish from './blueFish.png';
import cheese from './cheese.png';
import cheeseDeath from './cheeseDeath.png';
import greenFish from './greenFish.png';
import orangeFish from './orangeFish.png';
import redFish from './redFish.png';
import shark from './shark.png';
import skelly from './skelly.png';
import bck1 from './bck1.png';
import bck2 from './bck2.png';
import bck3 from './bck3.png';
import bck4 from './bck4.png';
import './App.css';

let id = 1;
let globalRefs;
const theDannyConstant = 1000;
const school = [];
const fishThreshold = 3;

const frameRate = 20;
const cheeseSize = 80;
const sharkSpeed = 0.7;
const fishTankSize = 500;
const pointSize = 20;
const pointRadius = 50;
const fishWaitingPeriod = 100;
const sharkWaitingPeriod = 5;
const boredomRadius = 10;
const eatingThreshold = 50;

const cheeses = [];
const addCheese = () => {
    const newCheese = {
        type: 'cheese',
        x: Math.floor(Math.random() * fishTankSize),
        y: Math.floor(Math.random() * fishTankSize),
        size: pointSize
    };

    cheeses.push(newCheese);
};

const fishTypes = ['redFish', 'blueFish', 'greenFish', 'orangeFish', 'shark'];
const fishPersonalities = {
    redFish: [
        { type: 'shark', likes: false },
        { type: 'cheese', likes: true },
        { type: 'redFish', likes: true },
        { type: 'orangeFish', likes: true }
    ],
    blueFish: [
        { type: 'shark', likes: false },
        { type: 'cheese', likes: true },
        { type: 'blueFish', likes: true }
    ],
    greenFish: [
        { type: 'shark', likes: false },
        { type: 'greenFish', likes: true },
        { type: 'cheese', likes: true },
        { type: 'blueFish', likes: true }
    ],
    orangeFish: [
        { type: 'cheese', likes: true },
        { type: 'orangeFish', likes: true },
        { type: 'redFish', likes: true }
    ],
    shark: [
        { type: 'blueFish', likes: true },
        { type: 'greenFish', likes: true },
        { type: 'orangeFish', likes: true },
        { type: 'redFish', likes: true }
    ]
};

const coinFlip = () => !!Math.floor(Math.random() * 2);

const getSmallDistance = () => Math.floor(Math.random() * pointRadius);

const kill = fish => {
    if (!fish.type !== 'skelly') {
        fish.fish = globalRefs.skelly;
        fish.type = 'skelly';
        fish.desireX = fish.x;
        fish.desireY = fish.y;
        fish.restingPeriod = 200000;
        setTimeout(() => {
            const index = school.findIndex(schoolFish => fish.id === schoolFish.id);
            school.splice(index, 1);
            addFish({});
        }, 5000);
    }
};

const addFish = options => {
    if (school.length >= theDannyConstant) return;
    const { fishType: type } = options;
    //all types except shark
    const fishType = type || fishTypes[Math.floor(Math.random() * (fishTypes.length - 1))];
    const speedModifier = fishType === 'shark' ? sharkSpeed : 1;
    console.log('New Fish!');
    const newFish = {
        id: `${fishType}${id}`,
        fish: globalRefs[fishType],
        type: fishType,
        personality: fishPersonalities[fishType],
        x: Math.floor(Math.random() * fishTankSize),
        y: Math.floor(Math.random() * fishTankSize),
        desireX: 225,
        desireY: 225,
        restingPeriod: 0,
        size: fishType === 'shark' ? 80 : 40,
        speedModifier,
        isBored: function() {
            const xDiff = Math.abs(this.x - this.desireX);
            const yDiff = Math.abs(this.y - this.desireY);

            return (
                this.restingPeriod === 0 &&
                xDiff <= this.speedModifier &&
                yDiff <= this.speedModifier
            );
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
                    Math.sqrt((closestFish.x - this.x) ** 2) +
                        Math.sqrt((closestFish.y - this.y) ** 2) <
                    eatingThreshold
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
                            this.desireX =
                                Math.floor(Math.random() * (fishTankSize / 4)) + fishTankSize / 2;
                            this.desireY = Math.floor(Math.random() * (fishTankSize / 4));
                        } else if (desireObject.x > 250 && desireObject.y <= 250) {
                            this.desireX = Math.floor(Math.random() * (fishTankSize / 4));
                            this.desireY =
                                Math.floor(Math.random() * (fishTankSize / 4)) + fishTankSize / 2;
                        } else if (desireObject.x <= 250 && desireObject.y <= 250) {
                            this.desireX =
                                Math.floor(Math.random() * (fishTankSize / 4)) + fishTankSize / 2;
                            this.desireY =
                                Math.floor(Math.random() * (fishTankSize / 4)) + fishTankSize / 2;
                        }
                    }
                } else {
                    this.fidget();
                }
            }

            this.desireX = Math.abs(this.desireX);
            this.desireY = Math.abs(this.desireY);
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

class MoveTowardBehaviour {
    constructor(destination, fish, maxSpeed, acceleration, acceptanceRadius) {
        this.destination = destination;
        this.fish = fish;

        this.velocity = 0;
        this.maxSpeed = maxSpeed;
        this.acceleration = acceleration;
        this.acceptanceRadius = acceptanceRadius * Math.random();
    }

    update() {
        this.moveTowardsTarget();
    }

    moveTowardsTarget() {
        const delta = {
            x: this.destination.x - this.fish.x,
            y: this.destination.y - this.fish.y
        };
        const distance = Math.sqrt(delta.x ** 2 + delta.y ** 2);

        if (distance < this.acceptanceRadius) {
            this.velocity = 0;
        } else {
            const decelerationDistance = this.velocity ** 2 / (2 * this.acceleration);

            if (distance - this.acceptanceRadius > decelerationDistance) {
                this.velocity = Math.min(
                    this.velocity + this.acceleration * (frameRate * 0.001),
                    this.maxSpeed
                );
            } else {
                this.velocity = Math.max(
                    this.velocity - this.acceleration * (frameRate * 0.001),
                    0
                );
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

class App extends Component {
    state = {
        interval: null
    };

    componentDidMount() {
        const blueFishRef = this.refs.blueFish;
        const greenFishRef = this.refs.greenFish;
        const redFishRef = this.refs.redFish;
        const orangeFishRef = this.refs.orangeFish;
        const sharkRef = this.refs.shark;
        const cheeseRef = this.refs.cheese;
        const skellyRef = this.refs.skelly;
        globalRefs = this.refs;
        Promise.all([
            blueFishRef,
            greenFishRef,
            redFishRef,
            orangeFishRef,
            sharkRef,
            cheeseRef,
            skellyRef
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
            addFish({ fishType: 'shark' });
            this.startTheFish();
        });
    }

    drawAllFish() {
        const canvas = this.refs.canvas;
        const context = canvas.getContext('2d');
        context.fillStyle = '#80CBC4';
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Cheese
        cheeses.forEach(cheese => {
            context.drawImage(this.refs.cheese, cheese.x, cheese.y, cheeseSize, cheeseSize);
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

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">AIquatic</h1>
                    <button onClick={this.startTheFish}>Start the fish</button>
                    <button onClick={this.stopTheFish}>Stop the fish</button>
                    <button onClick={addFish}>Add a fish</button>
                    <button
                        onClick={() => {
                            addFish({ fishType: 'shark' });
                        }}
                    >
                        Add a Shark
                    </button>
                    <button onClick={this.tenEx}>10X the fish</button>
                    <button onClick={addCheese}>Add Cheese</button>
                    <button
                        onClick={() => {
                            if (school[0]) kill(school[0]);
                        }}
                    >
                        Log
                    </button>
                </header>
                <canvas
                    ref="canvas"
                    height={fishTankSize}
                    width={fishTankSize}
                    style={{ border: '1px solid #000' }}
                />
                <img
                    src={blueFish}
                    ref="blueFish"
                    style={{ display: 'none' }}
                    alt="blueFish"
                    width={128}
                    height={128}
                />
                <img
                    src={redFish}
                    ref="redFish"
                    style={{ display: 'none' }}
                    alt="redFish"
                    width={128}
                    height={128}
                />
                <img
                    src={greenFish}
                    ref="greenFish"
                    style={{ display: 'none' }}
                    alt="greenFish"
                    width={128}
                    height={128}
                />
                <img
                    src={orangeFish}
                    ref="orangeFish"
                    style={{ display: 'none' }}
                    alt="orangeFish"
                    width={128}
                    height={128}
                />
                <img
                    src={shark}
                    ref="shark"
                    style={{ display: 'none' }}
                    alt="shark"
                    width={128}
                    height={128}
                />
                <img
                    src={cheese}
                    ref="cheese"
                    style={{ display: 'none' }}
                    alt="cheese"
                    width={128}
                    height={128}
                />
                <img
                    src={skelly}
                    ref="skelly"
                    style={{ display: 'none' }}
                    alt="skelly"
                    width={128}
                    height={128}
                />
            </div>
        );
    }
}

export default App;
