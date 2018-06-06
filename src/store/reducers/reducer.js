import * as actionTypes from "../actions/actionTypes";
const initialState = {
  machines: null,
  lines: null,
  transformers: null,
  loads: null,
  buses: null,
  breakers: null,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.BEGIN_GET_COMPONENTS:
      return { ...state, loading: true };
    case actionTypes.SET_COMPONENTS:
      return { ...state, ...action.components, loading: false };
    default:
      return state;
  }
};

export default reducer;
