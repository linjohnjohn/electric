import React from "react";

export default props => {
  return (
    <g
      onClick={() => console.log("clicked breaker test")}
      dangerouslySetInnerHTML={{ __html: props.innerHTML }}
    />
  );
};
