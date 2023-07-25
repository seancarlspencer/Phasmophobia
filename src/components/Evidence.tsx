import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, updateEvidence } from '../actions/actions';

const Evidence = () => {
  const evidenceValues = useSelector((state: any) => state.phas.evidenceValues);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  const handleEvidence = () => {
    let evidenceArray = document.querySelectorAll<HTMLInputElement>(".paper-filters input");
    let evidenceBoolArray: boolean[] = [];
    evidenceArray.forEach((evidence)=>{
      evidenceBoolArray.push(evidence.checked);
    })
    // console.log(evidenceBoolArray);
    dispatch(updateEvidence(evidenceBoolArray));
  };

  const handleReset = () => {
    let evidenceArray = document.querySelectorAll<HTMLInputElement>(".paper-filters input");
    evidenceArray.forEach((evidence)=>{
      evidence.checked=false;
    })
    dispatch(updateEvidence([false,false,false,false,false,false,false]));
  };

  return (
    <div className="evidence-paper">
      <div className="paper-header">
        E<span>VIDENCE</span>
      </div>
      <div className="paper-filters">
        <div className="filter-box">
          <img src={require("../assets/check.png")} className={evidenceValues[0] ? "checked" : ""}/>
          <input onChange={handleEvidence} type="checkbox" id="e1"/><label htmlFor="e1">EMF Level 5</label>
        </div>
        <div className="filter-box">
          <img src={require("../assets/check.png")} className={evidenceValues[1] ? "checked" : ""}/>
          <input onChange={handleEvidence} type="checkbox" id="e2"/><label htmlFor="e2">D.O.T.S</label>
        </div>
        <div className="filter-box">
          <img src={require("../assets/check.png")} className={evidenceValues[2] ? "checked" : ""}/>
          <input onChange={handleEvidence} type="checkbox" id="e3"/><label htmlFor="e3">Fingerprints</label>
        </div>
        <div className="filter-box">
          <img src={require("../assets/check.png")} className={evidenceValues[3] ? "checked" : ""}/>
          <input onChange={handleEvidence} type="checkbox" id="e4"/><label htmlFor="e4">Ghost Orbs</label>
        </div>
        <div className="filter-box">
          <img src={require("../assets/check.png")} className={evidenceValues[4] ? "checked" : ""}/>
          <input onChange={handleEvidence} type="checkbox" id="e5"/><label htmlFor="e5">Ghost Writing</label>
        </div>
        <div className="filter-box">
          <img src={require("../assets/check.png")} className={evidenceValues[5] ? "checked" : ""}/>
          <input onChange={handleEvidence} type="checkbox" id="e6"/><label htmlFor="e6">Spirit Box</label>
        </div>
        <div className="filter-box last">
          <img src={require("../assets/check.png")} className={evidenceValues[6] ? "checked" : ""}/>
          <input onChange={handleEvidence} type="checkbox" id="e7"/><label htmlFor="e7">Freezing Temperatures</label>
        </div>
      </div>
      <div className="paper-reset">
        <button className="paper-reset-button" onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Evidence;
