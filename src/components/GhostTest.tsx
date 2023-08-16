import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCompletedTasks, updateGuessArray } from '../actions/actions';

interface GhostTestInterface{
  ghostNames: Array<any>
  display: boolean
  testType: string
  completed: boolean
}

const GhostTest: React.FC<GhostTestInterface> = ({ghostNames,display, testType, completed}) => {
  const evidenceValues = useSelector((state:any) => state.phas.evidenceValues);
  const guessArray = useSelector((state: any) => state.phas.guessArray);
  const loading = useSelector((state: any) => state.phas.loading);
  const [toggleGuess,setGuess] = useState(false);
  const [toggleComplete,setComplete] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=>{
    //Check if should be checked.
    // if(loading){
    //   return;
    // }
    handleCheckingAllTests();
  },[evidenceValues,guessArray,ghostNames])


  const handleCheckingAllTests = ()=>{
    if(completed){
      return;
    }
    let shouldCheck=true;
    ghostNames.forEach((ghost)=>{
      if(!shouldCheck){
        return;
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
        return;
      }
    })
    if(!toggleComplete && shouldCheck){
          let testChecked = document.getElementById(`test-type-${testType.toLocaleLowerCase().replace(" ","-")}`) as HTMLInputElement;
          if(testChecked){
            setComplete(true);
            testChecked.checked = true;
            console.log("Checking"+testType);
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
      {/* <div className="test-type" onClick={handleToggleGuess}>
        {testType}
      </div> */}
      <div className="test-type-container">
        <input className="test-type" id={`test-type-${completed ? "completed-" : ""}${testType.toLocaleLowerCase().replace(" ","-")}`} type="checkbox" onChange={handleToggleGuess} checked>
        </input><label htmlFor={`test-type-${completed ? "completed-" : ""}${testType.toLocaleLowerCase().replace(" ","-")}`}>{testType}</label>
        <div className="custom-checkbox"></div>
      </div>
      {
        
      }
      <div className="ghost-test-list">
      {ghostNames.map((ghost)=>{
        return <div className="ghost-test" onClick={()=>{handleToggleSingleGuess(ghost[1])}}>
          <div className={`ghost-test-ghostname${guessArray[ghost[1]] ? " eliminated" : ""}`}>{ghost[0]}</div>
          <div className={`ghost-test-ghostadditional${guessArray[ghost[1]] ? " eliminated" : ""}`}>{ghost[2] != undefined ? `(${ghost[2].replace("(Requires 1 evidence)","")})` :""}</div>
          </div>
      })}
      </div>
    </div>
    :
    <div className={`ghost-test-container${completed ? " completed-list" : ""}${display ? "" : " hide"}${toggleComplete ? " completed" : ""}${toggleGuess ? " eliminated" : ""}${["Hunt Behavior","Hunt Speed","Hunt Appearance"].includes(testType) ? "" : ""}`}>
      {/* <div className="test-type" onClick={handleToggleGuess}>
        {testType}
      </div> */}
      <div className="test-type-container">
        <input className="test-type" id={`test-type-${completed ? "completed-" : ""}${testType.toLocaleLowerCase().replace(" ","-")}`} type="checkbox" onChange={handleToggleGuess}>
        </input><label htmlFor={`test-type-${completed ? "completed-" : ""}${testType.toLocaleLowerCase().replace(" ","-")}`}>{testType}</label>
        <div className="custom-checkbox"></div>
      </div>
      {
        
      }
      <div className="ghost-test-list">
      {ghostNames.map((ghost)=>{
        return <div className="ghost-test" onClick={()=>{handleToggleSingleGuess(ghost[1])}}>
          <div className={`ghost-test-ghostname${guessArray[ghost[1]] ? " eliminated" : ""}`}>{ghost[0]}</div>
          <div className={`ghost-test-ghostadditional${guessArray[ghost[1]] ? " eliminated" : ""}`}>{ghost[2] != undefined ? `(${ghost[2].replace("(Requires 1 evidence)","")})` :""}</div>
          </div>
      })}
      </div>
    </div>
  );
};

export default GhostTest;
