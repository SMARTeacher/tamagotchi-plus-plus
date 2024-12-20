import React, { Component } from "react";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";

import { Duder, HeaderUI, IfBlock } from "./components";
import bck1 from "./assets/images/bck1.png";
import bck2 from "./assets/images/bck2.png";
import bck3 from "./assets/images/bck3.png";
import bck4 from "./assets/images/bck4.png";

import "../src/assets/styles/App.css";
import { addPet } from "./operations";
import { newActionNode, newConditionalNode } from "./operations/commands";

import { pets } from "./constants/petConstants";

import {
  petFactory,
  backgroundFactory,
  otherFactory,
  desireFactory,
  objectOfDesire
} from "./factories";

import { petTankSize, cheeseSize, frameRate,
  bedSize,
  
} from "./config";

let globalRefs;
let school = [];
let cheeses = [];
let beds = [];
const theBackground = [bck1, bck2, bck3, bck4][Math.floor(Math.random() * 4)];
const speechBubbleBaseSize = 45;


const mapCommands = (commands) => {
  commands.forEach((command) => {
    if (command.type === "if") {
      // school.find((pet) => 
      // newConditionalNode
    }
  });
}

class App extends Component {
  state = {
    interval: null,
    commands: [{ type: "if" }, { type: "if" }, { type: "if" }],
  };
  componentDidMount() {
    const pet_charfoalRef = this.refs.pet_charfoal;
    const pet_pomprikleRef = this.refs.pet_pomprikle;
    const pet_squawksRef = this.refs.pet_squawks;
    const pet_sprikeRef = this.refs.pet_sprike;
    const cheeseRef = this.refs.cheese;
    const skellyRef = this.refs.skelly;
    const cheeseDeathRef = this.refs.cheeseDeath;
    const bck1Ref = this.refs.bck1;
    const bck2Ref = this.refs.bck2;
    const bck3Ref = this.refs.bck3;
    const bck4Ref = this.refs.bck4;
    globalRefs = this.refs;
    Promise.all([
      pet_charfoalRef,
      pet_pomprikleRef,
      pet_squawksRef,
      pet_sprikeRef,
      cheeseRef,
      skellyRef,
      cheeseDeathRef,
      bck1Ref,
      bck2Ref,
      bck3Ref,
      bck4Ref,
    ]).then(() => {
      addPet({ globalRefs, school, petType: "pet_squawks", cheeses });
      addPet({ globalRefs, school, petType: "pet_squawks", cheeses });
      addPet({ globalRefs, school, petType: "pet_squawks", cheeses });
      addPet({ globalRefs, school, petType: "pet_charfoal", cheeses });
      addPet({ globalRefs, school, petType: "pet_charfoal", cheeses });
      addPet({ globalRefs, school, petType: "pet_charfoal", cheeses });
      addPet({ globalRefs, school, petType: "pet_pomprikle", cheeses });
      addPet({ globalRefs, school, petType: "pet_pomprikle", cheeses });
      addPet({ globalRefs, school, petType: "pet_pomprikle", cheeses });
      addPet({ globalRefs, school, petType: "pet_sprike", cheeses });
      addPet({ globalRefs, school, petType: "pet_sprike", cheeses });
      addPet({ globalRefs, school, petType: "pet_sprike", cheeses });
    });
  }

  drawAllPets() {
    const petCanvas = globalRefs.petCanvas;
    const context = petCanvas.getContext("2d");
    context.clearRect(0, 0, petCanvas.width, petCanvas.height);

    // Cheese
    cheeses.forEach((cheese) => {
      cheese.updateCheese();
      context.drawImage(
        cheese.cheese,
        cheese.x,
        cheese.y,
        cheeseSize,
        cheeseSize
      );
    });

    // Bed
    beds.forEach((bed) => {
      bed.updateBed();
      context.drawImage(
        bed.bed,
        bed.x,
        bed.y,
        bedSize,
        bedSize
      );
    });

    school.forEach((pet) => {
      if (pet.restingPeriod !== 0) pet.restingPeriod--;
      if (!pet.isBored()) {
        pet.moveToDesire();
      } else {
        pet.setNewDesire();
      }

      context.drawImage(pet.pet, pet.x, pet.y, pet.size, pet.size);

      // render desire bubble
      if (globalRefs[pet.currentDesireType]) {
        context.drawImage(
          globalRefs.speechBubble,
          pet.x + 40,
          pet.y - 15,
          speechBubbleBaseSize,
          speechBubbleBaseSize
        );
        context.drawImage(
          globalRefs[pet.currentDesireType],
          pet.x + 53,
          pet.y - 5,
          speechBubbleBaseSize / 2,
          speechBubbleBaseSize / 2
        );
      }
    });
  }

  render() {
    return (
      <div className="App">
        <HeaderUI
          globalRefs={globalRefs}
          school={school}
          cheeses={cheeses}
          beds={beds}
        />

        <button
          onClick={() => {
            const { interval } = this.state;
            if (!interval) {
              const interval = setInterval(() => {
                mapCommands(this.state.commands)
                this.drawAllPets();
              }, frameRate);

              this.setState({ interval });
            }
          }}
        >
          Start
        </button>
        <button
          onClick={() => {
            console.log(this.state);
            console.log(school);
          }}
        >
          Debug
        </button>
        <div>
          <div style={{ height: "50px" }}>
            {pets.map((pet) => (
              <Duder key={pet.type} {...pet} />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <canvas
              ref="petCanvas"
              height={petTankSize}
              width={petTankSize}
              style={{
                border: "1px solid #000",
                background: `url(${theBackground})`,
              }}
            />
            <div
              ref="codeSection"
              style={{
                display: "inline-block",
                border: "1px solid #000",
                height: petTankSize,
                padding: "10px",
              }}
            >
              {this.state.commands.map((command, index) => {
                if (command.type === "if") {
                  return <IfBlock command={command} key={index} />;
                }
                return null;
              })}
            </div>
          </div>
        </div>
        {petFactory()}
        {backgroundFactory()}
        {otherFactory()}
        {desireFactory()}
        {objectOfDesire()}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
