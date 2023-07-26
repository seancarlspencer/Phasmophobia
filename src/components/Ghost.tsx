import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../actions/actions';
import Evidence from './Evidence';
import phasGhosts from '../assets/phasEvidenceParsed.json';

interface GhostInterface{
  ghostName: string
  display: boolean
}

const Ghost: React.FC<GhostInterface> = ({ghostName, display}) => {
  const evidenceValues = useSelector((state: any) => state.phas.evidenceValues);
  const [toggleMore,setMore] = useState(false);
  const [toggleGuess,setGuess] = useState(false);
  const dispatch = useDispatch();
  let imageArray=["emf","dots","fingerprints","orbs","writing","ghost","freezing"];
  let displayArray=["EMF Level 5","D.O.T.S","Fingerprints","Ghost Orbs","Ghost Writing","Spirit Box","Freezing"];

  const handleToggleMore = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setMore(toggleMore => !toggleMore);
  }

  const handleToggleGuess = () => {
    console.log(toggleGuess);
    setGuess(toggleGuess => !toggleGuess);
  }

  return (
    <div className={`ghost-container${display ? "" : " hide"}${toggleGuess ? " eliminated" : ""}`} onClick={handleToggleGuess}>
      <div className="ghost-name">
        {ghostName}
      </div>
      <div className="ghost-evidence">
        {phasGhosts[ghostName as keyof typeof phasGhosts]["evidenceArray"].map((evidence,index)=>{
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
          return <li dangerouslySetInnerHTML={{__html: evidence}}></li>
        })}
      </ul>
      </div>
      {!toggleMore ? 
      <div className="ghost-tertiary">
      </div>
      :
      <div className="ghost-tertiary">
        <ul>
          {phasGhosts[ghostName as keyof typeof phasGhosts]["tertiaryEvidence"].map((evidence,index)=>{
            return <li dangerouslySetInnerHTML={{__html: evidence}}></li>
          })}
        </ul>
      </div>
      }
      {!toggleMore ? 
      <div className="ghost-more" onClick={handleToggleMore}>
        Click Here for More Information...
      </div>
      :
      <div className="ghost-more hide" onClick={handleToggleMore}>
        Hide...
      </div>
      }
    </div>
  );
};

export default Ghost;
