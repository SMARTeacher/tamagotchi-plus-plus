import React, { Component } from "react";

class Select extends Component {
  state = {
    selectedOption: null,
    menuOpen: false,
  };

  componentDidMount() {
    this.setState({ selectedOption: this.props.options[0] });
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
              }}
            />
          ))}
      </div>
    );
  }
}

export default Select;
