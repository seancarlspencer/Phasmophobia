import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../actions/actions';
import Evidence from './Evidence';
import phasGhosts from '../assets/phasEvidenceParsed.json';

interface GhostInterface{
  ghostName: string
}

const Ghost: React.FC<GhostInterface> = ({ghostName}) => {
  const evidenceValues = useSelector((state: any) => state.phas.evidenceValues);
  const dispatch = useDispatch();
  let imageArray=["emf","dots","fingerprints","orbs","writing","ghost","freezing"];
  let displayArray=["EMF Level 5","D.O.T.S","Fingerprints","Ghost Orbs","Ghost Writing","Spirit Box","Freezing"];

  return (
    <div className="ghost-container">
      <div className="ghost-name">
        {ghostName}
      </div>
      <div className="ghost-evidence">
        {phasGhosts[ghostName as keyof typeof phasGhosts]["evidenceArray"].map((evidence,index)=>{
          console.log(evidence);
          if(evidence){
            return <div className="ghost-evidence-display">
                      <img src={require(`../assets/${imageArray[index]}.png`)}/>
                      <div className="evidence-text">{displayArray[index]}</div>
                    </div>
          }
          else{
            return;
          }
        })}
      </div>
      <div className="ghost-properties">
        
      </div>
      <div className="ghost-secondary">
      <ul>
      {phasGhosts[ghostName as keyof typeof phasGhosts]["secondaryEvidence"].map((evidence,index)=>{
        return <li>{evidence}</li>
      })}
      </ul>
      </div>
    </div>
  );
};

export default Ghost;
