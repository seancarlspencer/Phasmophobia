import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, updateEvidence, updateEliminated } from '../actions/actions';
import FilterBox from './FilterBox';

const Evidence = () => {
  const {evidenceValues,possibleValues,eliminatedValues} = useSelector((state: any) => 
  ({evidenceValues:state.phas.evidenceValues,
    possibleValues:state.phas.possibleValues,
    eliminatedValues:state.phas.eliminatedValues,
  }));
  const dispatch = useDispatch();
  let evidenceArrayDisplay = [
    "EMF Level 5",
    "D.O.T.S",
    "Fingerprints",
    "Ghost Orbs",
    "Ghost Writing",
    "Spirit Box",
    "Freezing Temperatures",
  ]

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
    dispatch(updateEliminated([false,false,false,false,false,false,false]));
  };

  return (
    <div className="evidence-paper evidence-filters">
      <div className="paper-header">
        E<span>VIDENCE</span>
      </div>
      <div className="paper-filters">
        {evidenceArrayDisplay.map((ev,index)=>{
          return <FilterBox
            displayText={ev}
            index={index}
          />
        })}
      </div>
      <div className="paper-reset">
        <button className="paper-reset-button" onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Evidence;
