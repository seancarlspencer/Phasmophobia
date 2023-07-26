import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, updateEvidence } from '../actions/actions';

const Evidence = () => {
  const {evidenceValues,possibleValues} = useSelector((state: any) => 
  ({evidenceValues:state.phas.evidenceValues,
    possibleValues:state.phas.possibleValues}));
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  useEffect(()=>{
    console.log(possibleValues);
  })

  const handleEvidence = () => {
    let evidenceArray = document.querySelectorAll<HTMLInputElement>(".evidence-filters .paper-filters input");
    let evidenceBoolArray: boolean[] = [];
    evidenceArray.forEach((evidence)=>{
      evidenceBoolArray.push(evidence.checked);
    })
    // console.log(evidenceBoolArray);
    dispatch(updateEvidence(evidenceBoolArray));
  };

  const handleReset = () => {
    let evidenceArray = document.querySelectorAll<HTMLInputElement>(".evidence-filters .paper-filters input");
    evidenceArray.forEach((evidence)=>{
      evidence.checked=false;
    })
    dispatch(updateEvidence([false,false,false,false,false,false,false]));
  };

  return (
    <div className="evidence-paper evidence-filters">
      <div className="paper-header">
        E<span>VIDENCE</span>
      </div>
      <div className="paper-filters">
        <div className={`filter-box${possibleValues[0] ? "" : " not-possible"}`}>
          <img src={require("../assets/check.png")} className={evidenceValues[0] ? "checked" : ""}/>
          <input onChange={handleEvidence} type="checkbox" id="e1"/><label htmlFor="e1"><span>EMF Level 5</span></label>
        </div>
        <div className={`filter-box${possibleValues[1] ? "" : " not-possible"}`}>
          <img src={require("../assets/check.png")} className={evidenceValues[1] ? "checked" : ""}/>
          <input onChange={handleEvidence} type="checkbox" id="e2"/><label htmlFor="e2"><span>D.O.T.S</span></label>
        </div>
        <div className={`filter-box${possibleValues[2] ? "" : " not-possible"}`}>
          <img src={require("../assets/check.png")} className={evidenceValues[2] ? "checked" : ""}/>
          <input onChange={handleEvidence} type="checkbox" id="e3"/><label htmlFor="e3"><span>Fingerprints</span></label>
        </div>
        <div className={`filter-box${possibleValues[3] ? "" : " not-possible"}`}>
          <img src={require("../assets/check.png")} className={evidenceValues[3] ? "checked" : ""}/>
          <input onChange={handleEvidence} type="checkbox" id="e4"/><label htmlFor="e4"><span>Ghost Orbs</span></label>
        </div>
        <div className={`filter-box${possibleValues[4] ? "" : " not-possible"}`}>
          <img src={require("../assets/check.png")} className={evidenceValues[4] ? "checked" : ""}/>
          <input onChange={handleEvidence} type="checkbox" id="e5"/><label htmlFor="e5"><span>Ghost Writing</span></label>
        </div>
        <div className={`filter-box${possibleValues[5] ? "" : " not-possible"}`}>
          <img src={require("../assets/check.png")} className={evidenceValues[5] ? "checked" : ""}/>
          <input onChange={handleEvidence} type="checkbox" id="e6"/><label htmlFor="e6"><span>Spirit Box</span></label>
        </div>
        <div className={`filter-box last${possibleValues[6] ? "" : " not-possible"}`}>
          <img src={require("../assets/check.png")} className={evidenceValues[6] ? "checked" : ""}/>
          <input onChange={handleEvidence} type="checkbox" id="e7"/><label htmlFor="e7"><span>Freezing Temperatures</span></label>
        </div>
      </div>
      <div className="paper-reset">
        <button className="paper-reset-button" onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Evidence;
