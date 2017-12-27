import React, { Component } from 'react';
import fish from './fish.png';
import './App.css';

const school = [];
const fishSpeed = 20;
const fishSize = 40;
const fishTankSize = 500;
const pointSize = 50;



const greenPoint = {
    color: '#0F0',
    x: 30,
    y: 30,
    size: pointSize,
}

const bluePoint = {
    color: '#00F',
    x: 400,
    y: 200,
    size: pointSize,
}

const redPoint = {
    color: '#F00',
    x: 250,
    y: 400,
    size: pointSize,
}

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

        this.drawPoint(context, redPoint);
        this.drawPoint(context, bluePoint);
        this.drawPoint(context, greenPoint);

        school.forEach(fish => {
            !!Math.floor(Math.random() * 2) ? fish.x++ : fish.x--;
            !!Math.floor(Math.random() * 2) ? fish.y++ : fish.y--;
            context.drawImage(fish.fish, fish.x, fish.y, fishSize, fishSize);
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
        const newFish = {
            fish: this.refs.fish,
            x: Math.floor(Math.random() * fishTankSize),
            y: Math.floor(Math.random() * fishTankSize)
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

    drawPoint = (context, point) => {
        context.fillStyle = point.color;
        context.fillRect(point.x, point.y, point.size, point.size);
    }

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
