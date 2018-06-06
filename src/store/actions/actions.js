import * as actionTypes from "./actionTypes";

export const setComponents = (
  machines,
  loads,
  transformers,
  buses,
  lines,
  breakers
) => {
  const components = {
    machines,
    loads,
    transformers,
    buses,
    lines,
    breakers
  };
  return {
    type: actionTypes.SET_COMPONENTS,
    components
  };
};
