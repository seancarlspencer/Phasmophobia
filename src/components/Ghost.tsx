import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../actions/actions';
import Evidence from './Evidence';
import phasGhosts from '../assets/phasEvidenceParsed.json';

interface GhostInterface{
  ghostName: string
  display: boolean
}

const Ghost: React.FC<GhostInterface> = ({ghostName, display}) => {
  const {evidenceValues,toggleExpert} = useSelector((state: any) => ({evidenceValues: state.phas.evidenceValues,
    toggleExpert: state.phas.toggleExpert}));
  const [toggleMore,setMore] = useState(false);
  const [toggleGuess,setGuess] = useState(false);
  const dispatch = useDispatch();
  let imageArray=["emf","dots","fingerprints","orbs","writing","ghost","freezing"];
  let displayArray=["EMF Level 5","D.O.T.S","Fingerprints","Ghost Orbs","Ghost Writing","Spirit Box","Freezing"];
  let displayArrayExpert=["EMF 5","DOTS","Fingerp.","Orbs","Writing","Spirit Box","Freezing"];
  let eliminatedStrings=[
    `Not a ${ghostName}.`,
    `Couldn't be a ${ghostName}.`,
    `${ghostName}? Nah...`,
    `Please don't be a ${ghostName}...`,
    `Don't think it's a ${ghostName}.`,
    `${ghostName}? Probably Not.`,
    `If it's a ${ghostName}, I swear-`,
    `Insym says it's not a ${ghostName}.`
  ];

  let eliminatedStringsTwins=[
    `Not ${ghostName}.`,
    `Couldn't be ${ghostName}.`,
    `${ghostName}? Nah...`,
    `Please don't be ${ghostName}...`,
    `Don't think it's ${ghostName}.`,
    `${ghostName}? Probably Not.`,
    `If it's ${ghostName}, I swear-`,
    `Insym says it's not ${ghostName}.`
  ];

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
    setGuess(toggleGuess => !toggleGuess);
  }

  return (
    <div className={`ghost-container${display ? "" : " hide"}${toggleGuess ? " eliminated" : ""}${toggleExpert ? " expert" : ""}`} onClick={handleToggleGuess}>
      <div className="ghost-name">
        {toggleGuess ? 
        (["The Twins","The Mimic"].includes(ghostName) ? 
        eliminatedStringsTwins[Math.floor(Math.random() * eliminatedStringsTwins.length)] : eliminatedStrings[Math.floor(Math.random() * eliminatedStrings.length)])
         : ghostName}
      </div>
      <div className="ghost-evidence">
        {phasGhosts[ghostName as keyof typeof phasGhosts]["evidenceArray"].map((evidence,index)=>{
          if(evidence){
            return <div className="ghost-evidence-display">
                      <img src={require(`../assets/${imageArray[index]}.png`)}/>
                      <div className="evidence-text">{toggleExpert ? displayArrayExpert[index] : displayArray[index]}</div>
                    </div>
          }
          else{
            return;
          }
        })}
      </div>
      <div className={`ghost-expert${toggleExpert && !toggleMore ? "": " hide"}`}>
      <ul>
        {phasGhosts[ghostName as keyof typeof phasGhosts]["expertMode"].map((evidence,index)=>{
          return <li dangerouslySetInnerHTML={{__html: evidence}}></li>
        })}
      </ul>
      </div>
      <div className={`ghost-secondary${!toggleExpert ? "": toggleMore ? "" : " hide"}`}>
      <ul>
        {phasGhosts[ghostName as keyof typeof phasGhosts]["secondaryEvidence"].map((evidence,index)=>{
          return <li dangerouslySetInnerHTML={{__html: evidence}}></li>
        })}
      </ul>
      </div>
      <div className={`ghost-tertiary${toggleMore ? "": " hide"}`}>
        <ul>
          {phasGhosts[ghostName as keyof typeof phasGhosts]["tertiaryEvidence"].map((evidence,index)=>{
            return <li dangerouslySetInnerHTML={{__html: evidence}}></li>
          })}
        </ul>
      </div>
      {(phasGhosts[ghostName as keyof typeof phasGhosts]["tertiaryEvidence"].length != 0 || toggleExpert) ? 
      !toggleMore ? 
      <div className="ghost-more" onClick={handleToggleMore}>
        More...
      </div>
      :
      <div className="ghost-more hide" onClick={handleToggleMore}>
        Hide...
      </div>
      :
      <div></div>
      }
    </div>
  );
};

export default Ghost;
