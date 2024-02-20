import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateGuessArray } from '../actions/actions';
import Ghost from './Ghost';

interface GhostTestInterface{
  ghostNames: Array<any>
  display: boolean
  testType: string
  completed: boolean
  ghostNamesChecked: boolean[]
}

const GhostTest: React.FC<GhostTestInterface> = ({ghostNames,display, testType, completed, ghostNamesChecked}) => {
  const evidenceValues = useSelector((state:any) => state.phas.evidenceValues);
  const guessArray = useSelector((state: any) => state.phas.guessArray);
  const loading = useSelector((state: any) => state.phas.loading);
  const [toggleGuess,setGuess] = useState(false);
  const [toggleComplete,setComplete] = useState(false);
  const dispatch = useDispatch();
  const ghostNamesCheckedParsed = JSON.stringify(ghostNamesChecked);

  useEffect(()=>{
    //Check if should be checked.
    if(loading || !display || completed){
      return;
    }
    handleCheckingAllTests();
  },[ghostNamesCheckedParsed,ghostNames])


  const handleCheckingAllTests = ()=>{
    let shouldCheck=true;
    ghostNames.every((ghost)=>{
      if(!shouldCheck){
        return false;
      }
      if(!guessArray[ghost[1]]){
        //Found ghost that is not eliminated, therefore, set Complete to false and uncheck if it's set as completed.
        shouldCheck=false;
        if(toggleComplete){
            let testChecked = document.getElementById(`test-type-${testType.toLocaleLowerCase().replace(" ","-")}`) as HTMLInputElement;
            if(testChecked){
              setComplete(false);
              testChecked.checked = false;
            }
        }
        return false;
      }
      return true;
    })
    if(!toggleComplete && shouldCheck){
      let testChecked = document.getElementById(`test-type-${testType.toLocaleLowerCase().replace(" ","-")}`) as HTMLInputElement;
      if(testChecked){
        setComplete(true);
        testChecked.checked = true;
      }
    }
  }

  const handleToggleGuess = () => {
    let testChecked = document.getElementById(`test-type-${completed ? "completed-" : ""}${testType.toLocaleLowerCase().replace(" ","-")}`) as HTMLInputElement;

    //This should only affect completed Tasks if we are checking a list to completion, or unchecking a completed list.
    if(testChecked){
      let tempGuess = [...guessArray];
      if(completed){
        setComplete(false);
        ghostNames.forEach((ghost)=>{
          tempGuess[ghost[1]] = false;
        })
      }
      else{
        if(testChecked.checked){
            setComplete(true);
            ghostNames.forEach((ghost)=>{
              tempGuess[ghost[1]] = true;
            })
        }
        else{
            setComplete(false);
            ghostNames.forEach((ghost)=>{
              tempGuess[ghost[1]] = false;
            })
        }
      }
      dispatch(updateGuessArray(tempGuess));
    }
  }

  const handleToggleSingleGuess = (index:number) => {
    let testChecked = document.getElementById(`test-type-${completed ? "completed-" : ""}${testType.toLocaleLowerCase().replace(" ","-")}`) as HTMLInputElement;
    if(testChecked){
      if(testChecked.checked && guessArray[index]){
        //Uncheck if we are unchecking a ghost task
        testChecked.checked = false;
      }
    }
    let tempGuess = [...guessArray];
    tempGuess[index] = !guessArray[index];
    //Check if all ghosts checked
    dispatch(updateGuessArray(tempGuess));
    let shouldCheck = true;
    ghostNames.forEach((ghost)=>{
      if(!tempGuess[ghost[1]]){
        setComplete(false);
        shouldCheck=false;
        return;
      }
    })
    if(testChecked && shouldCheck){
      if(!testChecked.checked){
        setComplete(true);
        testChecked.checked = true;
      }
    }
  }

  return (
    completed ? 
    <div className={`ghost-test-container${completed ? " completed-list" : ""}${display ? "" : " hide"}${toggleComplete ? " completed" : ""}${toggleGuess ? " eliminated" : ""}${["Hunt Behavior","Hunt Speed","Hunt Appearance"].includes(testType) ? "" : ""}`}>
      <div className="test-type-container">
        <input className="test-type" id={`test-type-${completed ? "completed-" : ""}${testType.toLocaleLowerCase().replace(" ","-")}`} type="checkbox" onChange={handleToggleGuess} checked>
        </input><label htmlFor={`test-type-${completed ? "completed-" : ""}${testType.toLocaleLowerCase().replace(" ","-")}`}>{testType}</label>
        <div className="custom-checkbox"></div>
      </div>
      {
        
      }
      <div className="ghost-test-list">
      {ghostNames.map((ghost,index)=>{
        return <div className="ghost-test" onClick={()=>{handleToggleSingleGuess(ghost[1])}} key={index}>
          <div className={`ghost-test-ghostname${guessArray[ghost[1]] ? " eliminated" : ""}`}>{ghost[0]}</div>
          <div className={`ghost-test-ghostadditional${guessArray[ghost[1]] ? " eliminated" : ""}`}>{ghost[2] != undefined ? `(${ghost[2].replace("(Requires 1 evidence)","").replace("(Not definitive)","")})` :""}</div>
          </div>
      })}
      </div>
    </div>
    :
    <div className={`ghost-test-container${completed ? " completed-list" : ""}${display ? "" : " hide"}${toggleComplete ? " completed" : ""}${toggleGuess ? " eliminated" : ""}${["Hunt Behavior","Hunt Speed","Hunt Appearance"].includes(testType) ? "" : ""}`}>
      <div className="test-type-container">
        <input className="test-type" id={`test-type-${completed ? "completed-" : ""}${testType.toLocaleLowerCase().replace(" ","-")}`} type="checkbox" onChange={handleToggleGuess}>
        </input><label htmlFor={`test-type-${completed ? "completed-" : ""}${testType.toLocaleLowerCase().replace(" ","-")}`}>{testType}</label>
        <div className="custom-checkbox"></div>
      </div>
      {
        
      }
      <div className="ghost-test-list">
      {ghostNames.map((ghost,index)=>{
        return <div className="ghost-test" onClick={()=>{handleToggleSingleGuess(ghost[1])}} key={index}>
          <div className={`ghost-test-ghostname${guessArray[ghost[1]] ? " eliminated" : ""}`}>{ghost[0]}</div>
          <div className={`ghost-test-ghostadditional${guessArray[ghost[1]] ? " eliminated" : ""}`}>{ghost[2] != undefined ? `(${ghost[2].replace("(Requires 1 evidence)","").replace("(Not definitive)","")})` :""}</div>
          </div>
      })}
      </div>
    </div>
  );
};

// export default GhostTest;

const MemoizedGhostTest = React.memo(GhostTest, (props,nextProps)=>{
  if(props.display!=nextProps.display){
    return false;
  }
  if(props.completed!=nextProps.completed){
    return false;
  }
  if(props.ghostNames.length!=nextProps.ghostNames.length){
    return false;
  }
  if (`${props.ghostNamesChecked}` != `${nextProps.ghostNamesChecked}`){
    return false;
  }
  return true;
  // True means 'use Memo' as in, the data has not changed, so we can use a memoized version of it.
});

export {MemoizedGhostTest}
