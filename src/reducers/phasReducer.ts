import { AnyAction } from 'redux';

const initialState = {
  evidenceValues: [false,false,false,false,false,false,false],
  possibleValues: [true,true,true,true,true,true,true],
  toggleSticky: true
};

const phasReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'updateEvidence':
      return { ...state, evidenceValues: action.payload };
    case 'updatePossible':
      return { ...state, possibleValues: action.payload };
    case 'toggleSticky':
      return { ...state, toggleSticky: !state.toggleSticky };
    default:
      return state;
  }
};

export default phasReducer;
