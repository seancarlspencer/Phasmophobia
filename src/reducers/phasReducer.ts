import { AnyAction } from 'redux';

const initialState = {
  evidenceValues: [false,false,false,false,false,false,false],
  eliminatedValues: [false,false,false,false,false,false,false],
  possibleValues: [true,true,true,true,true,true,true],
  toggleSticky: true,
  toggleExpert: localStorage.getItem("expert")=="true" || localStorage.getItem("expert")==null,
  speedValues: [false,false,false],
  checkSpeed: false,
  lightMode: localStorage.getItem("lightMode")=="true",
  evidenceNumber: localStorage.getItem("evidenceNumber") ? localStorage.getItem("evidenceNumber") : 3,
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
        if(action.payload[i]){
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
    case 'lightMode':
      localStorage.setItem("lightMode",`${!state.lightMode}`)
      if(!state.lightMode){
        document.documentElement.setAttribute('data-theme', 'light');
      }
      else{
        document.documentElement.setAttribute('data-theme', 'dark');
      }
      return { ...state, lightMode: !state.lightMode };
    case 'evidenceNumber':
      localStorage.setItem("evidenceNumber",`${action.payload}`)
      console.log(action.payload);
      return { ...state, evidenceNumber: action.payload };
    default:
      return state;
  }
};

export default phasReducer;
