import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../actions/actions';
import Evidence from './Evidence';
import ObjectiveBoard from './ObjectiveBoard';

const Homepage = () => {
  const evidenceValues = useSelector((state: any) => state.phas.evidenceValues);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  return (
    <div className="homepage">
      <div className="objective-board-container">
        <div className="evidence evidence-1">
          <Evidence/>
        </div>
        {/* <div className="evidence evidence-2">
          
        </div> */}
        <div className="objective-board">
          <ObjectiveBoard/>
        </div>
      </div>
      
    </div>
  );
};

export default Homepage;
