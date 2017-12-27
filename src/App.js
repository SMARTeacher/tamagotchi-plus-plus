import React, { Component } from 'react';
import fish from './fish.png';
import './App.css';

const school = [];

class App extends Component {
    state = {
        interval: null
    };

    componentDidMount() {
        this.initCanvas();
    }

    initCanvas = () => {
        const context = this.refs.canvas.getContext('2d');
        const fish = this.refs.fish;
        fish.onload = () => {
            const startingLocation = 200;
            school.push({
                fish,
                x: startingLocation,
                y: startingLocation
            });
            context.drawImage(fish, startingLocation, startingLocation, 40, 40);
            this.startTheFish();
        };
    };

    drawAllFish() {
        const canvas = this.refs.canvas;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        school.forEach(fish => {
            !!Math.floor(Math.random() * 2) ? fish.x++ : fish.x--;
            !!Math.floor(Math.random() * 2) ? fish.y++ : fish.y--;
            context.drawImage(fish.fish, fish.x, fish.y, 40, 40);
        });
    }

    startTheFish = () => {
        const { interval } = this.state;
        if (!interval) {
            const interval = setInterval(() => {
                this.drawAllFish();
            }, 20);

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
            x: Math.floor(Math.random() * 400),
            y: Math.floor(Math.random() * 400),
        }
        school.push(newFish)
    }

    render() {
        const square = 500;
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to THE FISHTANK</h1>
                    <button onClick={this.startTheFish}>Start the fish</button>
                    <button onClick={this.stopTheFish}>Stop the fish</button>
                    <button onClick={this.addFish}>Add a fish</button>
                </header>
                <canvas
                    ref="canvas"
                    height={square}
                    width={square}
                    style={{ border: '1px solid #000' }}
                />
                <img src={fish} ref="fish" style={{ display: 'none' }} alt="FISH" width={128} height={128} />
            </div>
        );
    }
}

export default App;
