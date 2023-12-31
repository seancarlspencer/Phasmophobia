import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateEvidence, updateEliminated, updateSpeed, updateEvidenceNumber, updateGuessArray} from '../actions/actions';
import FilterBox from './FilterBox';
import GhostSpeed from './GhostSpeed';
import ReactGA from 'react-ga';

type EvidenceType = {
  displayType: string
}

const Evidence:React.FC<EvidenceType> = ({displayType}) => {
  const evidenceNumber = useSelector((state: any) => state.phas.evidenceNumber);
  const mobileView = useSelector((state: any) => state.phas.mobileView);
  const loading = useSelector((state: any) => state.phas.loading);
  const [stateEvidenceNum, updateStateEvidenceNum] = useState(evidenceNumber);
  const dispatch = useDispatch();
  let evidenceArrayDisplay = [
    "EMF Level 5",
    "D.O.T.S",
    "Ultraviolet",
    "Ghost Orbs",
    "Ghost Writing",
    "Spirit Box",
    "Freezing Temperatures",
  ]
  let speedDisplayValues = ["Slow","Normal","Fast"]

  useEffect(()=>{
    if(loading){
      return;
    }
    if(evidenceNumber != stateEvidenceNum){
      updateStateEvidenceNum(evidenceNumber);
      dispatch(updateEvidence([false,false,false,false,false,false,false]));
      dispatch(updateEliminated([false,false,false,false,false,false,false]));
      dispatch(updateSpeed([false,false,false]));
    }
  },[evidenceNumber])

  const handleEvidenceNumber = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // ReactGA.event({
    //   category: 'Evidence',
    //   action: 'Changed Evidence #',
    //   value: parseInt(e.target.value)
    // });
    updateStateEvidenceNum(parseInt(e.target.value));
    dispatch(updateEvidenceNumber(parseInt(e.target.value)));
    dispatch(updateEvidence([false,false,false,false,false,false,false]));
    dispatch(updateEliminated([false,false,false,false,false,false,false]));
    dispatch(updateSpeed([false,false,false]));
    dispatch(updateGuessArray(new Array<boolean>(24).fill(false)));
  };

  const handleReset = () => {
    // ReactGA.event({
    //   category: 'Evidence',
    //   action: 'Reset',
    // });
    let evidenceArray = document.querySelectorAll<HTMLInputElement>(".evidence-filters .paper-filters input");
    evidenceArray.forEach((evidence)=>{
      evidence.checked=false;
    })
    dispatch(updateEvidence([false,false,false,false,false,false,false]));
    dispatch(updateEliminated([false,false,false,false,false,false,false]));
    dispatch(updateSpeed([false,false,false]));
    dispatch(updateGuessArray(new Array<boolean>(24).fill(false)));
  };

  return (
    <div className="evidence-paper evidence-filters">
      <div className="paper-header">
        E<span>VIDENCE</span>
        <select onChange={(e)=>handleEvidenceNumber(e)} id={`evNum-${displayType}`} value={stateEvidenceNum}>
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
            aria={displayType}
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
          aria={displayType}
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
