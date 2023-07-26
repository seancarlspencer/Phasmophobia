import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, updatePossible } from '../actions/actions';
import Evidence from './Evidence';
import phasGhosts from '../assets/phasEvidenceParsed.json';
import Ghost from './Ghost';

const ObjectiveBoard = () => {
  const evidenceValues = useSelector((state: any) => state.phas.evidenceValues);
  const dispatch = useDispatch();

  useEffect(()=>{
    let possibleValues = [false,false,false,false,false,false,false];
    for(let x=0;x<evidenceValues.length;x++){
      if(evidenceValues[x]){
        Object.keys(phasGhosts).map((ghost:string)=>{
          let valid = true;
          for(let i=0;i<evidenceValues.length;i++){
            if(evidenceValues[i] && !phasGhosts[ghost as keyof typeof phasGhosts]["evidenceArray"][i]){
              valid = false;
            }
          }
          if (valid){
            for(let j=0;j<evidenceValues.length;j++){
              if(!possibleValues[j] && phasGhosts[ghost as keyof typeof phasGhosts]["evidenceArray"][j]){
                possibleValues[j]= true;
                console.log(ghost)
                console.log(j);
              }
            }
          }
        });
        console.log(evidenceValues);
        console.log(possibleValues);
        handlePossible(possibleValues);
        return;
      }
    }
    possibleValues = [true,true,true,true,true,true,true];
    handlePossible(possibleValues);
  },[evidenceValues])

  const handlePossible=(arr: Array<boolean>)=>{
    dispatch(updatePossible(arr))
  }

  const nothing=()=>{
  }
  

  return (
    <div className="objective-board-content">
      <div className="objective-board-ghost-container">
      {Object.keys(phasGhosts).map((ghost:string)=>{
        for(let i=0;i<evidenceValues.length;i++){
          if(evidenceValues[i] && !phasGhosts[ghost as keyof typeof phasGhosts]["evidenceArray"][i]){
            return <Ghost
              ghostName={ghost}
              display={false}
            />;
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
