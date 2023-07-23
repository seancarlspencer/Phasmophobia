import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import calendarReducer from './calendarReducer';
import dayReducer from './dayReducer';
import phasReducer from './phasReducer';

const rootReducer = combineReducers({
  counter: counterReducer,
  calendar: calendarReducer,
  day: dayReducer,
  phas: phasReducer
});

export default rootReducer;
