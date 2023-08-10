import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateGuessArray } from '../actions/actions';

interface GhostTestInterface{
  ghostNames: Array<any>
  display: boolean
  testType: string
}

const GhostTest: React.FC<GhostTestInterface> = ({ghostNames,display, testType}) => {
  const evidenceValues = useSelector((state:any) => state.phas.evidenceValues);
  const toggleExpert = useSelector((state:any) => state.phas.toggleExpert);
  const guessArray = useSelector((state: any) => state.phas.guessArray);
  const [toggleMore,setMore] = useState(false);
  const [toggleGuess,setGuess] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(evidenceValues.includes(true)){
      return;
    }
    else{
      setGuess(false);
    }
  },[evidenceValues])

  const handleToggleMore = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setMore(toggleMore => !toggleMore);
  }

  const handleToggleGuess = () => {
    let tempGuess = [...guessArray];
    ghostNames.forEach((ghost)=>{
      tempGuess[ghost[1]] = true;
    })
    dispatch(updateGuessArray(tempGuess));
  }

  const handleToggleSingleGuess = (index:number) => {
    let tempGuess = [...guessArray];
    tempGuess[index] = !guessArray[index];
    dispatch(updateGuessArray(tempGuess));
  }

  return (
    <div className={`ghost-test-container${display ? "" : " hide"}${toggleGuess ? " eliminated" : ""}${toggleExpert ? " expert" : ""}${["Hunt Behavior","Hunt Speed","Hunt Appearance"].includes(testType)? " ghost-tests-many" : ""}`}>
      <div className="test-type" onClick={handleToggleGuess}>
        {testType}
      </div>
      <div className="ghost-test-list">
      {ghostNames.map((ghost)=>{
        return <div className="ghost-test" onClick={()=>{handleToggleSingleGuess(ghost[1])}}>
          <div className={`ghost-test-ghostname${guessArray[ghost[1]] ? " eliminated" : ""}`}>{ghost[0]}</div>
          <div className={`ghost-test-ghostadditional${guessArray[ghost[1]] ? " eliminated" : ""}`}>{ghost[2] != undefined ? `(${ghost[2]})` :""}</div>
          </div>
      })}
      </div>
    </div>
  );
};

export default GhostTest;
