import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import './App.scss'
import Homepage from './components/Homepage';
import EvidenceMobile from './components/EvidenceMobile';

// Reminder of how Redux works, Provider provides a store which holds all the states of application.
// Reducers handle state transactions
// Actions describe how to modify the state
// Actions get dispatched to the redux store from a Component.  The store sends the action to the reducer, the reducer handles the actions, returns a new state.
// useSelector() allows components to subscribe to state changes.
// useDispatch() allows components to trigger state changes.

// Overall the flow is Component >
// dispatch Action to Store >
// Store sends Action to Reducer >
// Reducer returns new State Values >
// Values updated in Store >
// Component reads from Store to reflect any changes.

const App = () => {
  return (
    <Provider store={store}>
      <EvidenceMobile/>
      <Homepage/>
    </Provider>
  );
};

export default App;

