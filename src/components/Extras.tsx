import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, updateEvidence, handleToggleExpert, handleLightMode } from '../actions/actions';
import GhostSpeed from './GhostSpeed';

const Extras = () => {
  const {toggleExpert,lightMode} = useSelector((state: any) => 
  ({
    toggleExpert:state.phas.toggleExpert,
    lightMode:state.phas.lightMode,
  }));
  const dispatch = useDispatch();
  let speedDisplayValues = ["Slow","Normal","Fast"]


  useEffect(()=>{
    console.log(lightMode);
  },[lightMode])

  const handleToggleExpertAction = () =>{
    console.log(lightMode);
    dispatch(handleToggleExpert());
  }

  const handleLightModeAction = () =>{
    dispatch(handleLightMode());
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
          <img src={require("../assets/check.png")} className={!toggleExpert ? "checked" : ""}/>
          <input onChange={handleToggleExpertAction} type="checkbox" id="expert"/><label className="extra-input" htmlFor="expert"><span className="skew">Beginner Mode</span></label>
          <div className="recommended">(Recommended for New Players)</div>
        </div>
        <div className={`filter-box expert`}>
          <img src={require("../assets/check.png")}/>
          <input onChange={handleLightModeAction} type="checkbox" id="light"/><label className="extra-input" htmlFor="light"><span className="skew">{lightMode ? "Back to the Asylum": "Back to the Van"}</span></label>
          <div className="recommended">{lightMode ? "(Dark Mode)": "(Light Mode)"}</div>
        </div>
      </div>
    </div>
  );
};

export default Extras;
