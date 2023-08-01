import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateEvidence, updateEliminated } from '../actions/actions';

type FilterBoxType = {
  index: number,
  displayText: string,
  aria: string
}

const FilterBox:React.FC<FilterBoxType> = ({index,displayText,aria}) => {
  const evidenceValues = useSelector((state: any) => state.phas.evidenceValues);
  const possibleValues = useSelector((state: any) => state.phas.possibleValues);
  const eliminatedValues = useSelector((state: any) => state.phas.eliminatedValues);
  const evidenceNumber = useSelector((state: any) => state.phas.evidenceNumber);
  const dispatch = useDispatch();

  const handleEvidence = () => {
    let evArray = [...evidenceValues];
    let elArray = [...eliminatedValues];
    if (evidenceNumber < 3){
      // Cannot Eliminate Evidence in Nightmare/Insane/Custom 0 evidence modes.
      if(!evArray[index] && !elArray[index]){
        // Neither Checked nor eliminated
        evArray[index] = true;
        // console.log("Checking")
      }
      else if (evArray[index]){
        // Currently Checked
        evArray[index] = false;
        // console.log("Unchecking")
      }
    }
    else{
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
    }
    dispatch(updateEvidence(evArray));
    dispatch(updateEliminated(elArray));
  };

  return (
    <div className={`filter-box${possibleValues[index] ? "" : " not-possible"}`}>
      <input onClick={handleEvidence} type="checkbox" id={`e${index}-${aria}`}/><label className={`${evidenceValues[index] ? "checked" :
      eliminatedValues[index] ? "eliminated" : ""}`}  htmlFor={`e${index}-${aria}`}><span>{displayText}</span></label>
    </div>
  );
};

export default FilterBox;
