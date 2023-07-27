import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../actions/actions';
import Evidence from './Evidence';
import ObjectiveBoard from './ObjectiveBoard';
import Extras from './Extras';
import GhostSpeed from './GhostSpeed';

const Homepage = () => {
  const evidenceValues = useSelector((state: any) => state.phas.evidenceValues);
  const [toggleSticky,setToggleSticky] = useState(false);
  const dispatch = useDispatch();

  const handleToggleSticky = () => {
    setToggleSticky(toggleSticky => !toggleSticky);
    var offsetHeight = document.querySelector<HTMLDivElement>('.evidence');
    var objectiveBoard = document.querySelector<HTMLDivElement>('.homepage');
    if (offsetHeight && objectiveBoard && !toggleSticky){
      console.log(offsetHeight.offsetHeight);
      objectiveBoard.style.transform = `translateY(${offsetHeight.offsetHeight}px)`;
    }
    else if (offsetHeight && objectiveBoard && toggleSticky){
      console.log(offsetHeight.offsetHeight);
      objectiveBoard.style.transform = `translateY(0px)`;
    }
  }

  return (
    <div className={`homepage${toggleSticky ? " hide" : ""}`}>
      <div className="objective-board-container">
        <div className={`evidence evidence-1`}>
          <Evidence/>
        </div>
        <div className={'evidence evidence-2'}>
          <Extras/>
        </div>
        <div className="objective-board">
          <ObjectiveBoard/>
        </div>
      </div>
      
    </div>
  );
};

export default Homepage;
