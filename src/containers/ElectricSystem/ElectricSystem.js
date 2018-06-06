import React, { Component } from "react";

import ElectricFileHandler from "./ElectricFileHandler/ElectricFileHandler";
import ElectricDisplay from "./ElectricDisplay/ElectricDisplay";
class ElectricSystem extends Component {
  render() {
    return (
      <div>
        <ElectricFileHandler />
        <ElectricDisplay />
      </div>
    );
  }
}

export default ElectricSystem;
