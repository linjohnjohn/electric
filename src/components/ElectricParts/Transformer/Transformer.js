import React from "react";

const transformer = props => {
  return (
    <g
      onClick={() => console.log("clicked transformer test")}
      dangerouslySetInnerHTML={{ __html: props.innerHTML }}
    />
  );
};

export default transformer;
