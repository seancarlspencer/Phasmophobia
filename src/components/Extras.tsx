import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, updateEvidence, handleToggleExpert } from '../actions/actions';
import GhostSpeed from './GhostSpeed';

const Extras = () => {
  const {toggleExpert} = useSelector((state: any) => 
  ({toggleExpert:state.phas.toggleExpert}));
  const dispatch = useDispatch();
  let speedDisplayValues = ["Slow","Normal","Fast"]


  useEffect(()=>{
  })

  const handleToggleExpertAction = () =>{
    dispatch(handleToggleExpert());
  }

  return (
    <div className="evidence-paper extras">
      <div className="paper-filters">
        <div className="ghost-speed-container">
          <div className="ghost-speed-header">
            G<span>HOST</span> S<span>PEED</span>
          </div>
          {speedDisplayValues.map((speed,index)=>{
            return <GhostSpeed
            displayText={speed}
            index={index}
            />
          })}
        </div>
        <div className={`filter-box expert`}>
          <img src={require("../assets/check.png")} className={toggleExpert ? "checked" : ""}/>
          <input onChange={handleToggleExpertAction} type="checkbox" id="expert"/><label className="extra-input" htmlFor="expert"><span className="skew">Expert Mode</span></label>
          <div className="recommended">(Recommended for Nightmare/Insane Mode)</div>
        </div>
      </div>
    </div>
  );
};

export default Extras;
