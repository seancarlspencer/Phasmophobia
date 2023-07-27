import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, updateEvidence, updateEliminated } from '../actions/actions';

type FilterBoxType = {
  index: number,
  displayText: string
}

const FilterBox:React.FC<FilterBoxType> = ({index,displayText}) => {
  const {evidenceValues,possibleValues,eliminatedValues} = useSelector((state: any) => 
  ({evidenceValues:state.phas.evidenceValues,
    possibleValues:state.phas.possibleValues,
    eliminatedValues:state.phas.eliminatedValues,
  }));
  const dispatch = useDispatch();

  const handleEvidence = () => {
    let evArray = [...evidenceValues];
    let elArray = [...eliminatedValues];
    if(!evArray[index] && !elArray[index]){
      // Neither Checked nor eliminated
      evArray[index] = true;
      // console.log("Checking")
    }
    else if (evArray[index]){
      // Currently Checked
      evArray[index] = false;
      elArray[index] = true;
      // console.log("Eliminating")
    }
    else if (elArray[index]){
      // Currently Eliminated
      evArray[index] = false;
      elArray[index] = false;
      // console.log("Unchecking")
    }
    dispatch(updateEvidence(evArray));
    dispatch(updateEliminated(elArray));
  };

  return (
    <div className={`filter-box${possibleValues[index] ? "" : " not-possible"}`}>
      {/* {evidenceValues[index] ? <img src={require("../assets/check.png")} className="checked"/> :
      eliminatedValues[index] ? <img src={require("../assets/ghost.png")} className="checked"/> :
      <img src={require("../assets/check.png")} className=""/>} */}
      <input onClick={handleEvidence} type="checkbox" id={`e${index}`}/><label className={`${evidenceValues[index] ? "checked" :
      eliminatedValues[index] ? "eliminated" : ""}`}  htmlFor={`e${index}`}><span>{displayText}</span></label>
    </div>
  );
};

export default FilterBox;
