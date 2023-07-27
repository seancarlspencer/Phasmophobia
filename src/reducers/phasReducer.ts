import { AnyAction } from 'redux';

const initialState = {
  evidenceValues: [false,false,false,false,false,false,false],
  eliminatedValues: [false,false,false,false,false,false,false],
  possibleValues: [true,true,true,true,true,true,true],
  guessValues:[''],
  toggleSticky: true,
  toggleExpert: localStorage.getItem("expert")=="true"
};

const phasReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'updateEvidence':
      return { ...state, evidenceValues: action.payload };
    case 'updatePossible':
      return { ...state, possibleValues: action.payload };
    case 'updateEliminated':
      return { ...state, eliminatedValues: action.payload };
    case 'updateGuess':
      return { ...state, guessValues: action.payload };
    case 'toggleSticky':
      return { ...state, toggleSticky: !state.toggleSticky };
    case 'toggleExpert':
      localStorage.setItem("expert",`${!state.toggleExpert}`)
      return { ...state, toggleExpert: !state.toggleExpert };
    default:
      return state;
  }
};

export default phasReducer;
