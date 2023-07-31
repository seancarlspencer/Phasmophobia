import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, updateEvidence, updateEliminated, updateSpeed, updateEvidenceNumber } from '../actions/actions';
import FilterBox from './FilterBox';

const Evidence = () => {
  const {evidenceNumber} = useSelector((state: any) => 
  ({evidenceNumber:state.phas.evidenceNumber
  }));
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

  const handleEvidenceNumber = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateStateEvidenceNum(parseInt(e.target.value));
    dispatch(updateEvidenceNumber(parseInt(e.target.value)));
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
        <select defaultValue={evidenceNumber.toString()} onChange={(e)=>handleEvidenceNumber(e)} id="evNum" value={stateEvidenceNum}>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
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
