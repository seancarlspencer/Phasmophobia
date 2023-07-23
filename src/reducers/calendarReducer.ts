import { AnyAction } from 'redux';

const initialState = {
  startDayIndex: 0,
  month: 1,
  year: 2023,
  days: 30,
};

const calendarReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'updateStartDay':
      return { ...state, startDayIndex: action.payload};
    case 'updateMonth':
      return { ...state, month: action.payload};
    case 'updateYear':
      return { ...state, year: action.payload};
    case 'updateDays':
      return { ...state, days: action.payload};
    default:
      return state;
  }
};

export default calendarReducer;
