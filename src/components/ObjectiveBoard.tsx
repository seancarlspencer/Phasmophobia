import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../actions/actions';
import Evidence from './Evidence';
import phasGhosts from '../assets/phasEvidenceParsed.json';
import Ghost from './Ghost';

const ObjectiveBoard = () => {
  const evidenceValues = useSelector((state: any) => state.phas.evidenceValues);
  const dispatch = useDispatch();

  return (
    <div className="objective-board-content">
      <div className="objective-board-ghost-container">
      {Object.keys(phasGhosts).map((ghost:string)=>{
        for(let i=0;i<evidenceValues.length;i++){
          if(evidenceValues[i] && !phasGhosts[ghost as keyof typeof phasGhosts]["evidenceArray"][i]){
            return;
          }
        }
        return <Ghost
        ghostName={ghost}
        />
      })}
      </div>
    </div>
  );
};

export default ObjectiveBoard;
