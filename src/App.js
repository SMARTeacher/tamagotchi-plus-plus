import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import {
  Duder,
  HeaderUI
} from './components';

import '../src/assets/styles/App.css';
import {
  addPet,
} from './operations';



import { pets } from './constants/petConstants';

import {
  petFactory,
  backgroundFactory,
  otherFactory, 
  desireFactory
} from './factories';

import {
  petTankSize,
  cheeseSize,
  frameRate,
} from './config';

let globalRefs;
let school = [];
let cheeses = [];
let theBackground;
const speechBubbleBaseSize = 45;

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
      addPet({ globalRefs, school, petType: 'redFish', cheeses });
      addPet({ globalRefs, school, petType: 'redFish', cheeses });
      addPet({ globalRefs, school, petType: 'redFish', cheeses });
      addPet({ globalRefs, school, petType: 'blueFish', cheeses });
      addPet({ globalRefs, school, petType: 'blueFish', cheeses });
      addPet({ globalRefs, school, petType: 'blueFish', cheeses });
      addPet({ globalRefs, school, petType: 'greenFish', cheeses });
      addPet({ globalRefs, school, petType: 'greenFish', cheeses });
      addPet({ globalRefs, school, petType: 'greenFish', cheeses });
      addPet({ globalRefs, school, petType: 'orangeFish', cheeses });
      addPet({ globalRefs, school, petType: 'orangeFish', cheeses });
      addPet({ globalRefs, school, petType: 'orangeFish', cheeses });
      theBackground = globalRefs[`bck${Math.floor(Math.random() * 4) + 1}`];
      this.startThePets();
    });
  }

  drawAllPets() {
    const petCanvas = this.refs.petCanvas;
    const context = petCanvas.getContext('2d');
    context.drawImage(theBackground, 0, 0, petCanvas.width, petCanvas.height);

    if (this.state.turnOff) return;
    // Cheese
    cheeses.forEach(cheese => {
      cheese.updateCheese();
      context.drawImage(cheese.cheese, cheese.x, cheese.y, cheeseSize, cheeseSize);
    });

    school.forEach(pet => {
      if (pet.restingPeriod !== 0) pet.restingPeriod--;
      if (!pet.isBored()) {
        pet.moveToDesire();
      } else {
        pet.setNewDesire();
      }

      context.drawImage(pet.pet, pet.x, pet.y, pet.size, pet.size);

      // render desire bubble
      if(globalRefs[pet.currentDesireType]){
        context.drawImage(globalRefs.speechBubble, pet.x + 40, pet.y - 15, speechBubbleBaseSize, speechBubbleBaseSize)
        context.drawImage(globalRefs[pet.currentDesireType], pet.x + 53, pet.y - 5, speechBubbleBaseSize /2 , speechBubbleBaseSize /2 )
      }
    });
  }

  startThePets = () => {
    const { interval } = this.state;
    if (!interval) {
      const interval = setInterval(() => {
        this.drawAllPets();
      }, frameRate);

      this.setState({ interval });
    }
  };

  stopThePets = () => {
    clearInterval(this.state.interval);
    this.setState({ interval: null });
  };

  render() {
    return (
      <div className="App">
        <HeaderUI globalRefs={globalRefs} school={school} cheeses={cheeses} />
          <div>
            <div style={{ height: '50px' }}>
              {pets.map(pet => <Duder key={pet.type} {...pet} />)}
            </div>
            <canvas
              ref="petCanvas"
              height={petTankSize}
              width={petTankSize}
              style={{ border: '1px solid #000' }}
            />
            <canvas
              ref="codeCanvas"
              height={petTankSize}
              width={petTankSize / 2}
              style={{ border: '1px solid #000' }}
            />
          </div>
        {petFactory()}
        {backgroundFactory()}
        {otherFactory()}
        {desireFactory()}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App)
