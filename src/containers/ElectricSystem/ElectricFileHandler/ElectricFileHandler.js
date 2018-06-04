import React, { Component } from "react";
import $ from "jquery";

class ElectricFileHandler extends Component {
  state = {
    data: null,
    error: null
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
      let test = xml.find(`[inkscape\\:label=\\#bk]`);
      console.log(test);
    };
    if (svg_file.type === "image/svg+xml") {
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

  getData = () => {
    console.log(this.state.reader.result);
  };
  render() {
    return (
      <div>
        <input id="file-inp" type="file" ref={this.inputElement} />
        <input type="button" value="Load" onClick={this.onFileLoad} />
        <input type="button" value="Data" onClick={this.getData} />
      </div>
    );
  }
}

export default ElectricFileHandler;
