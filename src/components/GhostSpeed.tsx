import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {updateSpeed } from '../actions/actions';

type GhostSpeedType = {
  index: number,
  displayText: string,
  aria: string
}

const GhostSpeed:React.FC<GhostSpeedType> = ({index,displayText,aria}) => {
  const speedValues = useSelector((state: any) => state.phas.speedValues);
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
      ? <img alt="checkmark" src={require("../assets/check.png").default} className="checked"/>
      : <img alt="hidden checkmark" src={require("../assets/check.png").default} className=""/>}
      <input onClick={handleUpdateSpeed} type="checkbox" id={`speed-${index}-${aria}`}/><label htmlFor={`speed-${index}`}><span>{displayText}</span></label>
    </div>
  );
};

export default GhostSpeed;
