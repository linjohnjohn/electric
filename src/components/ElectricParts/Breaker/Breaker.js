import React from "react";

const breaker = props => {
  return (
    <g
      onClick={() => console.log("clicked breaker test")}
      dangerouslySetInnerHTML={{ __html: props.innerHTML }}
    />
  );
};

export default breaker;
