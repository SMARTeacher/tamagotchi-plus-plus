import React, { Component } from 'react';
import fish from './fish.png';
import './App.css';

class App extends Component {
    componentDidMount() {
        this.updateCanvas();
    }

    updateCanvas = () => {
        const context = this.refs.canvas.getContext('2d');
        const fish = this.refs.fish;
        fish.onload = () => {
            context.drawImage(fish, 20, 20, 40, 40);
        };
    };

    render() {
        const square = 500;
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to THE FISHTANK</h1>
                </header>
                <canvas
                    ref="canvas"
                    height={square}
                    width={square}
                    style={{ border: '1px solid #000' }}
                />
                <img src={fish} ref="fish" style={{ display: 'none' }} width={128} height={128} />
            </div>
        );
    }
}

export default App;
