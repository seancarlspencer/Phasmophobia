import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, updateEvidence, handleToggleExpert } from '../actions/actions';

const Extras = () => {
  const {toggleExpert} = useSelector((state: any) => 
  ({toggleExpert:state.phas.toggleExpert}));
  const dispatch = useDispatch();


  useEffect(()=>{
  })

  const handleToggleExpertAction = () =>{
    dispatch(handleToggleExpert());
  }

  return (
    <div className="evidence-paper extras">
      <div className="paper-header">
        E<span>XTRAS</span>
      </div>
      <div className="paper-filters">
        <div className={`filter-box`}>
          <img src={require("../assets/check.png")} className={toggleExpert ? "checked" : ""}/>
          <input onChange={handleToggleExpertAction} type="checkbox" id="expert"/><label className="extra-input" htmlFor="expert"><span className="skew">Expert Mode</span></label>
        </div>
      </div>
      <div className="paper-reset">
        {/* <button className="paper-reset-button" onClick={handleReset}>Reset</button> */}
      </div>
    </div>
  );
};

export default Extras;
