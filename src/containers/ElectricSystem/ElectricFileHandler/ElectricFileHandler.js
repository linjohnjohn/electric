import React, { Component } from "react";
import $ from "jquery";
import { connect } from "react-redux";

import Breaker from "../../../components/ElectricParts/Breaker/Breaker";
import Transformer from "../../../components/ElectricParts/Transformer/Transformer";
import Machine from "../../../components/ElectricParts/Machine/Machine";
import Line from "../../../components/ElectricParts/Line/Line";
import Load from "../../../components/ElectricParts/Load/Load";
import Bus from "../../../components/ElectricParts/Bus/Bus";
import * as actions from "../../../store/actions";

class ElectricFileHandler extends Component {
  state = {
    data: null,
    error: null,
    breakers: null,
    machines: null,
    lines: null,
    buses: null,
    loads: null,
    transformers: null
  };
  inputElement = React.createRef();

  onFileLoad = event => {
    let reader = new FileReader();
    let svg_file = this.inputElement.current.files[0];
    reader.onload = data => {
      let text = data.target.result;
      this.setState({
        data: text
      });
      let xml = $.parseXML(text);
      xml = $(xml);
      let allBreakers = xml.find(`[inkscape\\:label=\\#bk]`).toArray();
      let allMachines = xml.find(`[inkscape\\:label=\\#m]`).toArray();
      let allLines = xml.find(`[inkscape\\:label=\\#ln]`).toArray();
      let allLoads = xml.find(`[inkscape\\:label=\\#Ld]`).toArray();
      let allTransformers = xml.find(`[inkscape\\:label=\\#xfr]`).toArray();
      let allBuses = xml.find(`[inkscape\\:label=\\#bus]`).toArray();

      // console.log(
      //   allBreakers,
      //   allLines,
      //   allLoads,
      //   allMachines,
      //   allTransformers
      // );
      let breakersData = allBreakers.map((element, i) => (
        <Breaker key={"bk" + i} innerHTML={element.outerHTML} />
      ));
      let machinesData = allMachines.map((element, i) => (
        <Machine key={"m" + i} innerHTML={element.outerHTML} />
      ));
      let linesData = allLines.map((element, i) => (
        <Line key={"ln" + i} innerHTML={element.outerHTML} />
      ));
      let loadsData = allLoads.map((element, i) => (
        <Load key={"Ld" + i} innerHTML={element.outerHTML} />
      ));
      let transformersData = allTransformers.map((element, i) => (
        <Transformer key={"xf" + i} innerHTML={element.outerHTML} />
      ));
      let busesData = allBuses.map((element, i) => (
        <Bus key={"bus" + i} innerHTML={element.outerHTML} />
      ));
      // console.log(breakersData);
      this.props.setComponents(
        machinesData,
        loadsData,
        transformersData,
        busesData,
        linesData,
        breakersData
      );
    };
    if (svg_file && svg_file.type === "image/svg+xml") {
      reader.readAsText(svg_file);
    } else {
      this.setState({
        error: {
          fileInput: "input file must be svg"
        }
      });
    }
    // let elm = $("#file-inp");
    // console.log(elm[0]);
  };

  render() {
    return (
      <div>
        <input id="file-inp" type="file" ref={this.inputElement} />
        <input type="button" value="Load" onClick={this.onFileLoad} />
      </div>
    );
  }
}
const mapStatetoProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => {
  return {
    setComponents: (machines, loads, transformers, buses, lines, breakers) => {
      dispatch(
        actions.setComponents(
          machines,
          loads,
          transformers,
          buses,
          lines,
          breakers
        )
      );
    }
  };
};
export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(ElectricFileHandler);
