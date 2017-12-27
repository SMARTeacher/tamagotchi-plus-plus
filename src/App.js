import React, { Component } from 'react';
import fish from './fish.png';
import './App.css';

const school = [];
const fishSpeed = 20;
const fishSize = 40;
const fishTankSize = 500;
const pointSize = 20;
const pointRadius = 50;

const greenPoint = {
    color: 'green',
    x: 30,
    y: 30,
    size: pointSize
};

const bluePoint = {
    color: 'blue',
    x: 400,
    y: 200,
    size: pointSize
};

const redPoint = {
    color: 'red',
    x: 250,
    y: 400,
    size: pointSize
};

const points = [redPoint, bluePoint, greenPoint];
const colors = points.map(point => point.color);

const coinFlip = () => !!Math.floor(Math.random() * 2);

class App extends Component {
    state = {
        interval: null
    };

    componentDidMount() {
        this.initCanvas();
    }

    initCanvas = () => {
        const fish = this.refs.fish;
        fish.onload = () => {
            this.startTheFish();
        };
    };

    drawAllFish() {
        const canvas = this.refs.canvas;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);

        this.drawPOI(context, redPoint);
        this.drawPOI(context, bluePoint);
        this.drawPOI(context, greenPoint);

        school.forEach(fish => {
            this.moveToFavColor(context, fish);
        });
    }

    startTheFish = () => {
        const { interval } = this.state;
        if (!interval) {
            const interval = setInterval(() => {
                this.drawAllFish();
            }, fishSpeed);

            this.setState({ interval });
        }
    };

    stopTheFish = () => {
        clearInterval(this.state.interval);
        this.setState({ interval: null });
    };

    addFish = () => {
        const favColor = colors[Math.floor(Math.random() * colors.length)];
        const point = points.find(point => point.color === favColor);

        const newFish = {
            fish: this.refs.fish,
            x: Math.floor(Math.random() * fishTankSize),
            y: Math.floor(Math.random() * fishTankSize),
            desireX: coinFlip() ? point.x + Math.floor(Math.random() * pointRadius) : point.x - Math.floor(Math.random() * pointRadius),
            desireY: coinFlip() ? point.y + Math.floor(Math.random() * pointRadius) : point.y - Math.floor(Math.random() * pointRadius),
        };
        school.push(newFish);
    };

    tenEx = () => {
        school.forEach(fish => {
            let index;
            for (index = 0; index < 9; index++) {
                this.addFish();
            }
        });
    };

    moveToFavColor = (context, fish) => {
        // X movement
        const moveX = fish.desireX - fish.x;
        if (moveX !== 0) {
            moveX > 0 ? fish.x++ : fish.x--;
        } else {
            coinFlip() ? fish.x++ : fish.x--;
        }

        // Y movement
        const moveY = fish.desireY - fish.y;
        if (moveY !== 0) {
            moveY > 0 ? fish.y++ : fish.y--;
        } else {
            coinFlip() ? fish.y++ : fish.y--;
        }

        context.drawImage(fish.fish, fish.x, fish.y, fishSize, fishSize);
    };

    drawPOI = (context, point) => {
        context.fillStyle = point.color;
        context.fillRect(point.x, point.y, point.size, point.size);
    };

    render() {
        const square = fishTankSize;
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to THE FISHTANK</h1>
                    <button onClick={this.startTheFish}>Start the fish</button>
                    <button onClick={this.stopTheFish}>Stop the fish</button>
                    <button onClick={this.addFish}>Add a fish</button>
                    <button onClick={this.tenEx}>10X the fish</button>
                </header>
                <canvas
                    ref="canvas"
                    height={square}
                    width={square}
                    style={{ border: '1px solid #000' }}
                />
                <img
                    src={fish}
                    ref="fish"
                    style={{ display: 'none' }}
                    alt="FISH"
                    width={128}
                    height={128}
                />
            </div>
        );
    }
}

export default App;
