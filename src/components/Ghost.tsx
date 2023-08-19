import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import phasGhosts from '../assets/phasEvidenceParsed.json';

interface GhostInterface{
  ghostName: string
  display: boolean
  guessed: boolean
  handleToggleGuess: Function
}

const Ghost: React.FC<GhostInterface> = ({ghostName, display, guessed, handleToggleGuess}) => {
  const evidenceValues = useSelector((state:any) => state.phas.evidenceValues);
  const toggleExpert = useSelector((state:any) => state.phas.toggleExpert);
  const guessDisplayArray = useSelector((state:any) => state.phas.guessDisplayArray);
  const [toggleMore,setMore] = useState(false);
  let imageArray=["emf","dots","fingerprints","orbs","writing","ghost","freezing"];
  let displayArray=["EMF Level 5","D.O.T.S","Ultraviolet","Ghost Orbs","Ghost Writing","Spirit Box","Freezing"];
  let displayArrayExpert=["EMF 5","DOTS","Ultra V.","Orbs","Writing","Spirit Box","Freezing"];
  let eliminatedStrings=[
    `Not a${["Onryo", "Obake","Oni"].includes(ghostName) ? `n ${ghostName}` : ` ${ghostName}`}.`,
    `Couldn't be a${["Onryo", "Obake","Oni"].includes(ghostName) ? `n ${ghostName}` : ` ${ghostName}`}.`,
    `${ghostName}? Nah...`,
    `Please don't be a${["Onryo", "Obake","Oni"].includes(ghostName) ? `n ${ghostName}` : ` ${ghostName}`}...`,
    `Don't think it's a${["Onryo", "Obake","Oni"].includes(ghostName) ? `n ${ghostName}` : ` ${ghostName}`}.`,
    `${ghostName}? Probably Not.`,
    `If it's a${["Onryo", "Obake","Oni"].includes(ghostName) ? `n ${ghostName}` : ` ${ghostName}`}, I swear-`,
    `Insym says it's not a${["Onryo", "Obake","Oni"].includes(ghostName) ? `n ${ghostName}` : ` ${ghostName}`}.`
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

  let eliminatedString = eliminatedStrings[guessDisplayArray[phasGhosts[ghostName as keyof typeof phasGhosts]["index"]]];
  let eliminatedStringTwins = eliminatedStringsTwins[guessDisplayArray[phasGhosts[ghostName as keyof typeof phasGhosts]["index"]]];

  useEffect(()=>{
  },[])

  // useEffect(()=>{
  //   if(evidenceValues.includes(true)){
  //     return;
  //   }
  //   else{
  //     // setGuess(false);
  //   }
  // },[evidenceValues])

  const handleToggleMore = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setMore(toggleMore => !toggleMore);
  }

  // const handleToggleGuess = () => {
  //   setGuess(toggleGuess => !toggleGuess);
  // }

  return (
    <div className={`ghost-container${display ? "" : " hide"}${guessed ? " eliminated" : ""}${toggleExpert ? " expert" : ""}`} onClick={()=>{handleToggleGuess(ghostName)}}>
      <div className="ghost-name">
        {guessed ? 
        (["The Twins","The Mimic"].includes(ghostName) ? 
        eliminatedStringTwins : eliminatedString)
         : ghostName}
      </div>
      <div className="ghost-evidence">
        {phasGhosts[ghostName as keyof typeof phasGhosts]["evidenceArray"].map((evidence,index)=>{
          if(evidence && index !== 3){
            return <div key={index} className="ghost-evidence-display">
                      <img alt={imageArray[index]} src={require(`../assets/${imageArray[index]}.png`).default}/>
                      <div className="evidence-text">{toggleExpert ? displayArrayExpert[index] : displayArray[index]}</div>
                    </div>
          }
          else if(evidence && ghostName!=="The Mimic"){
            return <div key={index} className="ghost-evidence-display">
                    <img alt={imageArray[index]} src={require(`../assets/${imageArray[index]}.png`).default}/>
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
          return <li key={index} dangerouslySetInnerHTML={{__html: evidence}}></li>
        })}
      </ul>
      </div>
      <div className={`ghost-secondary${!toggleExpert ? "": toggleMore ? "" : " hide"}`}>
      <ul>
        {phasGhosts[ghostName as keyof typeof phasGhosts]["secondaryEvidence"].map((evidence,index)=>{
          return <li key={index} dangerouslySetInnerHTML={{__html: evidence}}></li>
        })}
      </ul>
      </div>
      <div className={`ghost-tertiary${toggleMore ? "": " hide"}`}>
        <ul>
          {phasGhosts[ghostName as keyof typeof phasGhosts]["tertiaryEvidence"].map((evidence,index)=>{
            return <li key={index} dangerouslySetInnerHTML={{__html: evidence}}></li>
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
