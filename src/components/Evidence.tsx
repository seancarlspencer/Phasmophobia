import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, updateEvidence, updateEliminated, updateSpeed, updateEvidenceNumber } from '../actions/actions';
import FilterBox from './FilterBox';
import GhostSpeed from './GhostSpeed';

const Evidence = () => {
  const evidenceNumber = useSelector((state: any) => state.phas.evidenceNumber);
  const [stateEvidenceNum, updateStateEvidenceNum] = useState(evidenceNumber);
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
  let speedDisplayValues = ["Slow","Normal","Fast"]

  const handleEvidenceNumber = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateStateEvidenceNum(parseInt(e.target.value));
    dispatch(updateEvidenceNumber(parseInt(e.target.value)));
    dispatch(updateEvidence([false,false,false,false,false,false,false]));
    dispatch(updateEliminated([false,false,false,false,false,false,false]));
    dispatch(updateSpeed([false,false,false]));
  };

  const handleReset = () => {
    let evidenceArray = document.querySelectorAll<HTMLInputElement>(".evidence-filters .paper-filters input");
    evidenceArray.forEach((evidence)=>{
      evidence.checked=false;
    })
    dispatch(updateEvidence([false,false,false,false,false,false,false]));
    dispatch(updateEliminated([false,false,false,false,false,false,false]));
    dispatch(updateSpeed([false,false,false]));
  };

  return (
    <div className="evidence-paper evidence-filters">
      <div className="paper-header">
        E<span>VIDENCE</span>
        <select onChange={(e)=>handleEvidenceNumber(e)} id="evNum" value={stateEvidenceNum}>
          <option value="3">3 (Default)</option>
          <option value="2">2 (Nightmare)</option>
          <option value="1">1 (Insane)</option>
          <option value="0">0</option>
        </select>
      </div>
      <div className="paper-filters">
        {evidenceArrayDisplay.map((ev,index)=>{
          return <FilterBox
            displayText={ev}
            index={index}
            key={ev}
          />
        })}
      </div>
      <div className="speed-mobile ghost-speed-container">
        <div className="ghost-speed-header">
          S<span>PEED</span>
        </div>
        {speedDisplayValues.map((speed,index)=>{
          return <GhostSpeed
          key={speed}
          displayText={speed}
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
