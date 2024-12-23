import React, { Component } from "react";

const getRandomElement = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

class Select extends Component {
  state = {
    selectedOption: null,
    menuOpen: false,
  };

  componentDidMount() {
    const option = getRandomElement(this.props.options);
    this.setState({ selectedOption: option });
    this.props.onSelect(option);
  }

  render() {
    return (
      <div>
        {!this.state.menuOpen && (
          <span
            style={{
              width: "50px",
              height: "50px",
            }}
            onClick={() => {
              this.setState({ menuOpen: !this.state.menuOpen });
            }}
          >
            {this.state.selectedOption && (
              <img
                src={this.state.selectedOption.img}
                style={{
                  width: "50px",
                  height: "50px",
                  outline: "1px solid black",
                  cursor: "pointer",
                }}
              />
            )}
          </span>
        )}

        {this.state.menuOpen &&
          this.props.options.map((option) => (
            <img
              key={option.name}
              src={option.img}
              style={{
                width: "50px",
                height: "50px",
                outline: "1px solid black",
                cursor: "pointer",
                backgroundColor:
                  this.state.selectedOption.name === option.name
                    ? "seagreen"
                    : "none",
              }}
              onClick={() => {
                this.setState({
                  menuOpen: !this.state.menuOpen,
                  selectedOption: option,
                });

                this.props.onSelect(option);
              }}
            />
          ))}
      </div>
    );
  }
}

export default Select;
