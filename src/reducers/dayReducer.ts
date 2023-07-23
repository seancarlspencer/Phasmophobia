import { AnyAction } from 'redux';

interface DayState {
  toggled: boolean;
}

const initialState: DayState = {
  toggled: false,
};

const dayReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'toggle':
      return { ...state, toggled: action.payload};
    default:
      return state;
  }
};

export default dayReducer;
