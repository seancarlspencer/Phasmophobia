import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCompletedTasks, updateGuessArray } from '../actions/actions';

interface GhostTestInterface{
  ghostNames: Array<any>
  display: boolean
  testType: string
  completed: boolean
  // guessArray: Array<boolean>
}

const GhostTest: React.FC<GhostTestInterface> = React.memo(({ghostNames,display, testType, completed}) => {
  const evidenceValues = useSelector((state:any) => state.phas.evidenceValues);
  const guessArray = useSelector((state: any) => state.phas.guessArray);
  const loading = useSelector((state: any) => state.phas.loading);
  const [toggleGuess,setGuess] = useState(false);
  const [toggleComplete,setComplete] = useState(false);
  const dispatch = useDispatch();
  let classNameParsed = testType.toLocaleLowerCase().replace(" ","-");
  let ghostIndexes = ['Spirit', 'Wraith', 'Phantom', 'Poltergeist', 'Banshee', 'Jinn', 'Mare', 'Revenant', 'Shade', 'Demon', 'Yurei', 'Oni', 'Yokai', 'Hantu', 'Goryo', 'Myling', 'Onryo', 'The Twins', 'Raiju', 'Obake', 'The Mimic', 'Moroi', 'Deogen', 'Thaye'];

  useEffect(()=>{
    //Check if should be checked.
    console.log("Rerendered");
    if(loading || !display || completed){
      return;
    }
    handleCheckingAllTests();
  },[evidenceValues,guessArray,ghostNames])


  const handleCheckingAllTests = ()=>{
    let shouldCheck=true;
    ghostNames.every((ghost)=>{
      if(!shouldCheck){
        return false;
      }
      if(!guessArray[ghostIndexes.indexOf(ghost[0])]){
        //Found ghost that is not eliminated, therefore, set Complete to false and uncheck if it's set as completed.
        shouldCheck=false;
        if(toggleComplete){
            let testChecked = document.getElementById(`test-type-${classNameParsed}`) as HTMLInputElement;
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
      let testChecked = document.getElementById(`test-type-${classNameParsed}`) as HTMLInputElement;
      if(testChecked){
        setComplete(true);
        testChecked.checked = true;
      }
    }
  }

  const handleToggleGuess = () => {
    let testChecked = document.getElementById(`test-type-${completed ? "completed-" : ""}${classNameParsed}`) as HTMLInputElement;

    //This should only affect completed Tasks if we are checking a list to completion, or unchecking a completed list.
    if(testChecked){
      let tempGuess = [...guessArray];
      if(completed){
        setComplete(false);
        ghostNames.forEach((ghost)=>{
          tempGuess[ghostIndexes.indexOf(ghost[0])] = false;
        })
      }
      else{
        if(testChecked.checked){
            setComplete(true);
            ghostNames.forEach((ghost)=>{
              tempGuess[ghostIndexes.indexOf(ghost[0])] = true;
            })
        }
        else{
            setComplete(false);
            ghostNames.forEach((ghost)=>{
              tempGuess[ghostIndexes.indexOf(ghost[0])] = false;
            })
        }
      }
      dispatch(updateGuessArray(tempGuess));
    }
  }

  const handleToggleSingleGuess = (index:number) => {
    let testChecked = document.getElementById(`test-type-${completed ? "completed-" : ""}${classNameParsed}`) as HTMLInputElement;
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
      if(!tempGuess[ghostIndexes.indexOf(ghost[0])]){
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
        <input className="test-type" id={`test-type-${completed ? "completed-" : ""}${classNameParsed}`} type="checkbox" onChange={handleToggleGuess} checked>
        </input><label htmlFor={`test-type-${completed ? "completed-" : ""}${classNameParsed}`}>{testType}</label>
        <div className="custom-checkbox"></div>
      </div>
      {
        
      }
      <div className="ghost-test-list">
      {ghostNames.map((ghost)=>{
        let ghostIndex = ghostIndexes.indexOf(ghost[0]);
        return <div className="ghost-test" onClick={()=>{handleToggleSingleGuess(ghostIndex)}}>
          <div className={`ghost-test-ghostname${guessArray[ghostIndex] ? " eliminated" : ""}`}>{ghost[0]}</div>
          <div className={`ghost-test-ghostadditional${guessArray[ghostIndex] ? " eliminated" : ""}`}>{ghost[1] != undefined ? `(${ghost[1].replace("(Requires 1 evidence)","")})` :""}</div>
        </div>
      })}
      </div>
    </div>
    :
    <div className={`ghost-test-container${completed ? " completed-list" : ""}${display ? "" : " hide"}${toggleComplete ? " completed" : ""}${toggleGuess ? " eliminated" : ""}${["Hunt Behavior","Hunt Speed","Hunt Appearance"].includes(testType) ? "" : ""}`}>
      <div className="test-type-container">
        <input className="test-type" id={`test-type-${completed ? "completed-" : ""}${classNameParsed}`} type="checkbox" onChange={handleToggleGuess}>
        </input><label htmlFor={`test-type-${completed ? "completed-" : ""}${classNameParsed}`}>{testType}</label>
        <div className="custom-checkbox"></div>
      </div>
      <div className="ghost-test-list">
      {ghostNames.map((ghost)=>{
        let ghostIndex = ghostIndexes.indexOf(ghost[0]);
        return <div className="ghost-test" onClick={()=>{handleToggleSingleGuess(ghostIndex)}}>
          <div className={`ghost-test-ghostname${guessArray[ghostIndex] ? " eliminated" : ""}`}>{ghost[0]}</div>
          <div className={`ghost-test-ghostadditional${guessArray[ghostIndex] ? " eliminated" : ""}`}>{ghost[1] != undefined ? `(${ghost[1].replace("(Requires 1 evidence)","")})` :""}</div>
          </div>
      })}
      </div>
    </div>
  );
}, arePropsEqual);

export default GhostTest;

function arePropsEqual(prevProps: Readonly<GhostTestInterface>, nextProps: Readonly<GhostTestInterface>): boolean {
  if(prevProps.completed != nextProps.completed){
    return true;
  }
  if(prevProps.display != nextProps.display){
    return true;
  }
  prevProps.ghostNames.forEach((ghost)=>{

  })
    return true;
  
  throw new Error('Function not implemented.');
}
