import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../actions/actions';
import Evidence from './Evidence';
import ObjectiveBoard from './ObjectiveBoard';
import Extras from './Extras';
import GhostSpeed from './GhostSpeed';

const Homepage = () => {
  const evidenceValues = useSelector((state: any) => state.phas.evidenceValues);
  const [toggleSticky,setToggleSticky] = useState(false);

  useEffect(()=>{
    if (localStorage.getItem("lightMode")=="true"){
      document.documentElement.setAttribute('data-theme', 'light');
    }
    else{
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  },)

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
