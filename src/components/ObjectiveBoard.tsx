import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, updatePossible } from '../actions/actions';
import Evidence from './Evidence';
import phasGhosts from '../assets/phasEvidenceParsed.json';
import Ghost from './Ghost';

const ObjectiveBoard = () => {
  const {evidenceValues,possibleValues,eliminatedValues,speedValues,checkSpeed} = useSelector((state: any) => 
  ({evidenceValues:state.phas.evidenceValues,
    possibleValues:state.phas.possibleValues,
    eliminatedValues:state.phas.eliminatedValues,
    speedValues:state.phas.speedValues,
    checkSpeed:state.phas.checkSpeed
  }));
  const dispatch = useDispatch();

  useEffect(()=>{
    let possibleValues = [false,false,false,false,false,false,false];
    console.log("updating ghosts");
    // Skip Speed Check if no speed selected
    for(let x=0;x<evidenceValues.length;x++){
      // Determines which ghosts are possible
      if(evidenceValues[x]){
        Object.keys(phasGhosts).map((ghost:string)=>{
          let valid = true;
          for(let i=0;i<evidenceValues.length;i++){
            // Evidence selected, but Ghost does not have evidence
            if(evidenceValues[i] && !phasGhosts[ghost as keyof typeof phasGhosts]["evidenceArray"][i]){
              valid = false;
            }
          }
          if (valid){
            for(let j=0;j<evidenceValues.length;j++){
              if(!possibleValues[j] && phasGhosts[ghost as keyof typeof phasGhosts]["evidenceArray"][j]){
                possibleValues[j]= true;
                // console.log(ghost)
                // console.log(j);
              }
            }
          }
        });
        handlePossible(possibleValues);
        return;
      }
    }
    possibleValues = [true,true,true,true,true,true,true];
    handlePossible(possibleValues);
  },[evidenceValues,speedValues])

  const handlePossible=(arr: Array<boolean>)=>{
    dispatch(updatePossible(arr))
  }
  

  return (
    <div className="objective-board-content">
      <div className="objective-board-tooltip">
        Tap on Ghost to Eliminate
      </div>
      <div className="objective-board-ghost-container">
      {Object.keys(phasGhosts).map((ghost:string)=>{
        for(let i=0;i<evidenceValues.length;i++){
          // Checks if ghost does not have evidence that user selected
          if(evidenceValues[i] && !phasGhosts[ghost as keyof typeof phasGhosts]["evidenceArray"][i]){
            return <Ghost
              ghostName={ghost}
              display={false}
            />;
          }
          // Checks if ghost HAS evidence that user ELIMINATED
          if(eliminatedValues[i] && phasGhosts[ghost as keyof typeof phasGhosts]["evidenceArray"][i]){
            return <Ghost
              ghostName={ghost}
              display={false}
            />;
          }
        }
        // Checks if ghost does not have speed that user selected
        if (checkSpeed){
          for(let i=0;i<speedValues.length;i++){
            // Speed selected, but Ghost does not have speed
            if(speedValues[i] && !phasGhosts[ghost as keyof typeof phasGhosts]["speedArray"][i]){
              return <Ghost
              ghostName={ghost}
              display={false}
            />;
            }
          }
        }
        return <Ghost
          ghostName={ghost}
          display={true}
        />
      })}
      </div>
    </div>
  );
};

export default ObjectiveBoard;
