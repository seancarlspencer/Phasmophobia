import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, updateEvidence, handleToggleExpert, updateSpeed } from '../actions/actions';

type GhostSpeedType = {
  index: number,
  displayText: string
}

const GhostSpeed:React.FC<GhostSpeedType> = ({index,displayText}) => {
  const {speedValues} = useSelector((state: any) => 
  ({speedValues:state.phas.speedValues}));
  const dispatch = useDispatch();


  useEffect(()=>{
  })

  const handleUpdateSpeed = () =>{
    let speedArray = [...speedValues];
    if(!speedArray[index]){
      // Not Checked
      speedArray[index] = true;
    }
    else{
      speedArray[index] = false;
    }
    dispatch(updateSpeed(speedArray));
  }

  return (
    <div className="filter-box">
      {speedValues[index]
      ? <img src={require("../assets/check.png")} className="checked"/>
      : <img src={require("../assets/check.png")} className=""/>}
      <input onClick={handleUpdateSpeed} type="checkbox" id={`speed-${index}`}/><label htmlFor={`speed-${index}`}><span>{displayText}</span></label>
    </div>
  );
};

export default GhostSpeed;
