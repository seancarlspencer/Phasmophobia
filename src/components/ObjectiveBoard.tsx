import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateGuessArray, updatePossible } from '../actions/actions';
import phasGhosts from '../assets/phasEvidenceParsed.json';
import Ghost from './Ghost';
import GhostTest from './GhostTest';

const ObjectiveBoard = () => {
  const evidenceValues = useSelector((state: any) => state.phas.evidenceValues);
  const eliminatedValues = useSelector((state: any) => state.phas.eliminatedValues);
  const evidenceNumber = useSelector((state: any) => state.phas.evidenceNumber);
  const checkSpeed = useSelector((state: any) => state.phas.checkSpeed);
  const toggleExpert = useSelector((state: any) => state.phas.toggleExpert);
  const speedValues = useSelector((state: any) => state.phas.speedValues);
  const guessArray = useSelector((state: any) => state.phas.guessArray);
  const dispatch = useDispatch();

  useEffect(()=>{
  },[]);


  useEffect(()=>{
    let possibleValues = [false,false,false,false,false,false,false];
    // Skip Speed Check if no speed selected
    for(let x=0;x<evidenceValues.length;x++){
      // Determines which ghosts are possible
      if (evidenceValues.filter((x: any) => x).length >= evidenceNumber){
        // for(let i=0;i<evidenceValues.length;i++){
        //   possibleValues[i] = evidenceValues[i];
        // }
        // handlePossible(possibleValues);
        // return;
      }
      if(evidenceValues[x]){
        // Only check for possible ghosts if evidence is selected
        Object.keys(phasGhosts).map((ghost:string)=>{
          let valid = true;
          for(let i=0;i<evidenceValues.length;i++){
            // Evidence selected, but Ghost does not have evidence
            if(evidenceValues[i] && !phasGhosts[ghost as keyof typeof phasGhosts]["evidenceArray"][i]){
              valid = false;
              break;
            }
          }
          if (valid){
            for(let j=0;j<evidenceValues.length;j++){
              if(!possibleValues[j] && phasGhosts[ghost as keyof typeof phasGhosts]["evidenceArray"][j]){
                possibleValues[j]= true;
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
  },[evidenceValues,speedValues,guessArray])

  const handlePossible=(arr: Array<boolean>)=>{
    dispatch(updatePossible(arr))
  }
  
  const handleToggleGuess = (ghostName: string) => {
    let ghostIndex = phasGhosts[ghostName as keyof typeof phasGhosts]["index"];
    let tempGuess = [...guessArray];
    tempGuess[ghostIndex] = !guessArray[ghostIndex];
    dispatch(updateGuessArray(tempGuess));
  }

  return (
    <div className="objective-board-content">
      <div className="objective-board-tooltip">
        Tap on Ghost to Eliminate
      </div>
      <div className={`all-ghost-test-container${toggleExpert ? " expert" : ""}`}>
        <GhostTest
          testType={"Parabolic Microphone"}
          ghostNames={["Hantu"]}
          display={true}
          />
      </div>
      <div className={`objective-board-ghost-container${toggleExpert ? " expert" : ""}`}>
      {Object.keys(phasGhosts).sort((a, b) => phasGhosts[a as keyof typeof phasGhosts]["index"] > phasGhosts[b as keyof typeof phasGhosts]["index"] ? 1 : -1).map((ghost:string)=>{
        if(["Hantu","Goryo","Obake","Deogen","Moroi"].includes(ghost)){
          let guaranteedEvCheck = evidenceValues.filter((x: any) => x).length;
          if(guaranteedEvCheck == evidenceNumber && evidenceNumber!=0){
            if(ghost == "Hantu"){
              if(!evidenceValues[6]){
                  return <Ghost
                  key={ghost}
                  ghostName={ghost}
                  display={false}
                  guessed={guessArray[phasGhosts[ghost as keyof typeof phasGhosts]["index"]]}
                  handleToggleGuess={handleToggleGuess}
                />;
              }
            }
            if(ghost == "Goryo"){
              if(!evidenceValues[1]){
                return <Ghost
                key={ghost}
                ghostName={ghost}
                display={false}
                guessed={guessArray[phasGhosts[ghost as keyof typeof phasGhosts]["index"]]}
                handleToggleGuess={handleToggleGuess}
              />;
              }
            }
            if(ghost == "Obake"){
              if(!evidenceValues[2]){
                return <Ghost
                key={ghost}
                ghostName={ghost}
                display={false}
                guessed={guessArray[phasGhosts[ghost as keyof typeof phasGhosts]["index"]]}
                handleToggleGuess={handleToggleGuess}
              />;
              }
            }
            if(ghost == "Deogen" || ghost== "Moroi"){
              if(!evidenceValues[5]){
                return <Ghost
                key={ghost}
                ghostName={ghost}
                display={false}
                guessed={guessArray[phasGhosts[ghost as keyof typeof phasGhosts]["index"]]}
                handleToggleGuess={handleToggleGuess}
              />;
              }
            }
          }
        }
        for(let i=0;i<evidenceValues.length;i++){
          // Checks if ghost does not have evidence that user selected
          if(evidenceValues[i] && !phasGhosts[ghost as keyof typeof phasGhosts]["evidenceArray"][i]){
            return <Ghost
              key={ghost}
              ghostName={ghost}
              display={false}
              guessed={guessArray[phasGhosts[ghost as keyof typeof phasGhosts]["index"]]}
              handleToggleGuess={handleToggleGuess}
            />;
          }
          // Checks if ghost HAS evidence that user ELIMINATED
          if(eliminatedValues[i] && phasGhosts[ghost as keyof typeof phasGhosts]["evidenceArray"][i]){
            return <Ghost
              key={ghost}
              ghostName={ghost}
              display={false}
              guessed={guessArray[phasGhosts[ghost as keyof typeof phasGhosts]["index"]]}
              handleToggleGuess={handleToggleGuess}
            />;
          }
        }
        // Checks if ghost does not have speed that user selected
        if (checkSpeed){
          for(let i=0;i<speedValues.length;i++){
            // Speed selected, but Ghost does not have speed
            if(speedValues[i] && !phasGhosts[ghost as keyof typeof phasGhosts]["speedArray"][i]){
              return <Ghost
              key={ghost}
              ghostName={ghost}
              display={false}
              guessed={guessArray[phasGhosts[ghost as keyof typeof phasGhosts]["index"]]}
              handleToggleGuess={handleToggleGuess}
            />;
            }
          }
        }
        return <Ghost
          key={ghost}
          ghostName={ghost}
          display={true}
          guessed={guessArray[phasGhosts[ghost as keyof typeof phasGhosts]["index"]]}
          handleToggleGuess={handleToggleGuess}
        />
      })}
      </div>
    </div>
  );
};

export default ObjectiveBoard;
