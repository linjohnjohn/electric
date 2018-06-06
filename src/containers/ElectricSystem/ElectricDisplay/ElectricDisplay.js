import React, { Component } from "react";
import { connect } from "react-redux";

class ElectricDisplay extends Component {
  render() {
    let svg_components = [].concat(
      this.props.breakers,
      this.props.lines,
      this.props.loads,
      this.props.machines,
      this.props.buses,
      this.props.transformers
    );
    console.log(svg_components);
    return (
      <svg width="100%" height="100vh">
        <g transform="matrix(1,0,0,1,0,0)">{svg_components}</g>
      </svg>
    );
  }
}

const mapStatetoProps = state => ({
  ...state
});
export default connect(mapStatetoProps)(ElectricDisplay);
