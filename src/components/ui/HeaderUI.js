import {
  AddPet,
  AddCheese,
  TenX
} from './buttons';
import React from 'react';

const HeaderUI = (props) => {

  // Component implementation
  return (
    <div>
      {     <header className="App-header">
            <h1 className="App-title" style={{ margin: 0 }}>
              Tamagotchi++
            </h1>
            <AddCheese school={props.school} globalRefs={props.globalRefs} cheeses={props.cheeses} />
            <AddPet school={props.school} globalRefs={props.globalRefs} cheeses={props.cheeses} />
            <TenX school={props.school} globalRefs={props.globalRefs} cheeses={props.cheeses} />
          </header>}
    </div>
  );
};

export default HeaderUI;