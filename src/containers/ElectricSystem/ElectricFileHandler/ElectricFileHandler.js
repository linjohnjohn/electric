import React, { Component } from "react";
import $ from "jquery";

class ElectricFileHandler extends Component {
  state = {
    data: null,
    error: null,
    breakers: null,
    machines: null,
    lines: null,
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
      console.log(
        allBreakers,
        allLines,
        allLoads,
        allMachines,
        allTransformers
      );
      let breakersData = allBreakers.map(element => element.outerHTML);
      let machinesData = allMachines.map(element => element.outerHTML);
      let linesData = allLines.map(element => element.outerHTML);
      let loadsData = allLoads.map(element => element.outerHTML);
      let transformersData = allTransformers.map(element => element.outerHTML);
      console.log(breakersData);
      this.setState({
        breakers: breakersData,
        machines: machinesData,
        lines: linesData,
        loads: loadsData,
        transformers: transformersData
      });
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
    let svg_components = [].concat(
      this.state.breakers,
      this.state.lines,
      this.state.loads,
      this.state.machines,
      this.state.transformers
    );
    return (
      <div>
        <input id="file-inp" type="file" ref={this.inputElement} />
        <input type="button" value="Load" onClick={this.onFileLoad} />
        <svg
          width="100%"
          height="100vh"
          dangerouslySetInnerHTML={{ __html: svg_components.join("") }}
        />
      </div>
    );
  }
}

export default ElectricFileHandler;
