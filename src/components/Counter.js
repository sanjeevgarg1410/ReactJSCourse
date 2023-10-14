  import React from "react";

  class Counter extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        count: this.props.initialValue,
      };
    }

    increment = () => {
      this.setState((prevState) => ({ count: prevState.count + 1 }));
    };

    decrement = () => {
      this.setState((prevState) => ({ count: prevState.count - 1 }));
    };

    render() {
      
      return React.createElement(
        "div",
        { className: "counter" },
        React.createElement("h1", null, "Counter"),
        React.createElement("button", { onClick: this.decrement }, "-"),
        React.createElement("span", null, this.state.count),
        React.createElement("button", { onClick: this.increment }, "+")
      );
    }
  }

  export default Counter;
