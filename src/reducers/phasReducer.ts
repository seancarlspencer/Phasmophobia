import { AnyAction } from 'redux';

const initialState = {
  evidenceValues: [false,false,false,false,false,false,false],
  eliminatedValues: [false,false,false,false,false,false,false],
  possibleValues: [true,true,true,true,true,true,true],
  toggleSticky: true,
  toggleExpert: localStorage.getItem("expert")=="true",
  speedValues: [false,false,false],
  checkSpeed: false
};

const phasReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'updateEvidence':
      return { ...state, evidenceValues: action.payload };
    case 'updatePossible':
      return { ...state, possibleValues: action.payload };
    case 'updateEliminated':
      return { ...state, eliminatedValues: action.payload };
    case 'updateSpeed':
      let checkSpeedUpdate = false
      for(let i=0;i<action.payload.length;i++){
        console.log("Checking speed");
        console.log(action.payload);
        if(action.payload[i]){
          console.log("Speed found!");
          // If speed selected, check speed
          checkSpeedUpdate=true;
        }
      }
      return { ...state, speedValues: action.payload,
      checkSpeed: checkSpeedUpdate};
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
