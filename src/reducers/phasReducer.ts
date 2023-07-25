import { AnyAction } from 'redux';

const initialState = {
  evidenceValues: [false,false,false,false,false,false,false],
  toggleSticky: true
};

const phasReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'updateEvidence':
      return { ...state, evidenceValues: action.payload };
    case 'toggleSticky':
      return { ...state, toggleSticky: !state.toggleSticky };
    default:
      return state;
  }
};

export default phasReducer;
