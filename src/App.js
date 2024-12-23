import React, { Component } from "react";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";

import { Duder, HeaderUI, IfBlock } from "./components";
import bck1 from "./assets/images/bck1.png";
import bck2 from "./assets/images/bck2.png";
import bck3 from "./assets/images/bck3.png";
import bck4 from "./assets/images/bck4.png";

import "../src/assets/styles/App.css";
import { addCheese, addBed, addPet, killPet } from "./operations";
import { script, newActionNode } from "./operations/commands";

import { pets } from "./constants/petConstants";
import { refs, beds, cheeses, school } from "./constants/state";

import {
  petFactory,
  backgroundFactory,
  otherFactory,
  desireFactory,
  objectOfDesire,
} from "./factories";

import { petTankSize, cheeseSize, frameRate, bedSize } from "./config";

const theBackground = [bck1, bck2, bck3, bck4][Math.floor(Math.random() * 4)];
const speechBubbleBaseSize = 45;

function drawFlippedImage(context, pet) {
  const { pet: image, x, y, size } = pet;
  context.save();
  context.translate(x + size / 2, y + size / 2);
  context.scale(1, -1);
  context.drawImage(image, -size / 2, -size / 2, size, size);
  context.restore();
}

const mapCommands = (commands) => {
  const nodes = commands.map((command) => {
    if (command.type === "if") {
      const actors = school.filter(
        (pet) =>
          pet.type === command.petName &&
          pet.currentDesireType === command.desireName
      );
      if (actors.length) {
        if (command.actionName === "cheese") {
          return newActionNode(() => addCheese());
        } else if (command.actionName === "sleep") {
          return newActionNode(() => addBed());
        }
      }

      return newActionNode(() => {});
    } else {
      throw new Error("Not implemented");
    }
  });
  return script(nodes);
};

class App extends Component {
  state = {
    interval: null,
    commands: [],
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
      Object.keys(this.refs).forEach((key) => {
        refs[key] = this.refs[key];
      });

      addPet({ petType: "pet_squawks" });
      addPet({ petType: "pet_squawks" });
      addPet({ petType: "pet_squawks" });
      addPet({ petType: "pet_charfoal" });
      addPet({ petType: "pet_charfoal" });
      addPet({ petType: "pet_charfoal" });
      addPet({ petType: "pet_pomprikle" });
      addPet({ petType: "pet_pomprikle" });
      addPet({ petType: "pet_pomprikle" });
      addPet({ petType: "pet_sprike" });
      addPet({ petType: "pet_sprike" });
      addPet({ petType: "pet_sprike" });
    });
  }

  drawAllPets() {
    const petCanvas = refs.petCanvas;
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
      context.drawImage(bed.bed, bed.x, bed.y, bedSize, bedSize);
    });

    school.forEach((pet) => {
      pet.updatePet();
      if (pet.isDead()) {
        killPet(pet);
        drawFlippedImage(context, pet);
      } else {
        context.drawImage(pet.pet, pet.x, pet.y, pet.size, pet.size);
      }

      // render desire bubble
      if (refs[pet.currentDesireType]) {
        context.drawImage(
          refs.speechBubble,
          pet.x + 40,
          pet.y - 15,
          speechBubbleBaseSize,
          speechBubbleBaseSize
        );
        context.drawImage(
          refs[pet.currentDesireType],
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
        <HeaderUI />
        <button
          onClick={() => {
            this.setState({
              commands: [...this.state.commands, { type: "if" }],
            });
          }}
        >
          Add IF Block
        </button>
        <button
          onClick={() => {
            const secondsBetweenUpdates = 1;
            const { interval } = this.state;
            const script = mapCommands(this.state.commands);
            let lastUpdate = 0;
            if (!interval) {
              const interval = setInterval(() => {
                let currSec = Math.floor(Date.now() / 1000);
                if (
                  currSec % secondsBetweenUpdates === 0 &&
                  currSec > lastUpdate
                ) {
                  script.run();
                  lastUpdate = currSec;
                }
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
                height: petTankSize - 20,
                padding: "10px",
                width: "320px",
                overflowY: "scroll",
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
