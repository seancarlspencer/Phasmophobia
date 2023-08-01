import { combineReducers } from 'redux';
import phasReducer from './phasReducer';

const rootReducer = combineReducers({
  phas: phasReducer
});

export default rootReducer;
