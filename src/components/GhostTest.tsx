import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

interface GhostTestInterface{
  ghostNames: string[]
  display: boolean
  testType: string
}

const GhostTest: React.FC<GhostTestInterface> = ({ghostNames,display, testType}) => {
  const evidenceValues = useSelector((state:any) => state.phas.evidenceValues);
  const toggleExpert = useSelector((state:any) => state.phas.toggleExpert);
  const [toggleMore,setMore] = useState(false);
  const [toggleGuess,setGuess] = useState(false);

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
    <div className={`ghost-test-container${display ? "" : " hide"}${toggleGuess ? " eliminated" : ""}${toggleExpert ? " expert" : ""}`} onClick={handleToggleGuess}>
      
    </div>
  );
};

export default GhostTest;
