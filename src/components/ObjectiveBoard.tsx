import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleObjectiveBoardScreen, updateGuessArray, updatePossible } from '../actions/actions';
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
  const objectiveBoardScreen = useSelector((state: any) => state.phas.objectiveBoardScreen);
  const dispatch = useDispatch();

  type ghostTestType = {
    [key: string]: Array<any[]>
  }

  const [ghostTests,setGhostTests] = useState<ghostTestType>({})


  useEffect(()=>{

  },[]);


  useEffect(()=>{
    let ghostTestsTemp:ghostTestType = {}
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
        {Object.keys(phasGhosts).sort((a, b) => phasGhosts[a as keyof typeof phasGhosts]["index"] > phasGhosts[b as keyof typeof phasGhosts]["index"] ? 1 : -1).map((ghost:string)=>{
          if(["Hantu","Goryo","Obake","Deogen","Moroi"].includes(ghost)){
            let guaranteedEvCheck = evidenceValues.filter((x: any) => x).length;
            if(guaranteedEvCheck == evidenceNumber && evidenceNumber!=0){
              if(ghost == "Hantu"){
                if(!evidenceValues[6]){
                  return
                }
              }
              if(ghost == "Goryo"){
                if(!evidenceValues[1]){
                  return
                }
              }
              if(ghost == "Obake"){
                if(!evidenceValues[2]){
                  return
                }
              }
              if(ghost == "Deogen" || ghost== "Moroi"){
                if(!evidenceValues[5]){
                  return
                }
              }
            }
          }
          for(let i=0;i<evidenceValues.length;i++){
            // Checks if ghost does not have evidence that user selected
            if(evidenceValues[i] && !phasGhosts[ghost as keyof typeof phasGhosts]["evidenceArray"][i]){
              return
            }
            // Checks if ghost HAS evidence that user ELIMINATED
            if(eliminatedValues[i] && phasGhosts[ghost as keyof typeof phasGhosts]["evidenceArray"][i]){
              return
            }
          }
          // Checks if ghost does not have speed that user selected
          if (checkSpeed){
            for(let i=0;i<speedValues.length;i++){
              // Speed selected, but Ghost does not have speed
              if(speedValues[i] && !phasGhosts[ghost as keyof typeof phasGhosts]["speedArray"][i]){
                return
              }
            }
          }
          phasGhosts[ghost as keyof typeof phasGhosts]["ghostTestArray"].map((test)=>{
            if(ghostTestsTemp[test.split("|")[0]]){
              ghostTestsTemp[test.split("|")[0]].push([ghost,phasGhosts[ghost as keyof typeof phasGhosts]["index"],test.split("|")[1]]);
            }
            else{
              ghostTestsTemp[test.split("|")[0]] = [];
              ghostTestsTemp[test.split("|")[0]].push([ghost,phasGhosts[ghost as keyof typeof phasGhosts]["index"],test.split("|")[1]]);
            }
          })
        })}
        setGhostTests(ghostTestsTemp);
        console.log(ghostTests);
        handlePossible(possibleValues);
        return;
      }
    }
    Object.keys(phasGhosts).map((ghost:string)=>{
      if (checkSpeed){
        for(let i=0;i<speedValues.length;i++){
          // Speed selected, but Ghost does not have speed
          if(speedValues[i] && !phasGhosts[ghost as keyof typeof phasGhosts]["speedArray"][i]){
            return
          }
        }
      }
      phasGhosts[ghost as keyof typeof phasGhosts]["ghostTestArray"].map((test)=>{
        if(ghostTestsTemp[test.split("|")[0]]){
          ghostTestsTemp[test.split("|")[0]].push([ghost,phasGhosts[ghost as keyof typeof phasGhosts]["index"],test.split("|")[1]]);
        }
        else{
          ghostTestsTemp[test.split("|")[0]] = [];
          ghostTestsTemp[test.split("|")[0]].push([ghost,phasGhosts[ghost as keyof typeof phasGhosts]["index"],test.split("|")[1]]);
        }
      })
    })
    setGhostTests(ghostTestsTemp);
    console.log(ghostTests);
    possibleValues = [true,true,true,true,true,true,true];
    handlePossible(possibleValues);
  },[evidenceValues,speedValues,eliminatedValues,guessArray])

  const handlePossible=(arr: Array<boolean>)=>{
    dispatch(updatePossible(arr))
  }
  
  const handleToggleGuess = (ghostName: string) => {
    let ghostIndex = phasGhosts[ghostName as keyof typeof phasGhosts]["index"];
    let tempGuess = [...guessArray];
    tempGuess[ghostIndex] = !guessArray[ghostIndex];
    dispatch(updateGuessArray(tempGuess));
  }

  const handleObjectiveBoard = (screen: string) => {
    dispatch(handleObjectiveBoardScreen(screen));
  }

  let screenContent = <div></div>;

  switch(objectiveBoardScreen){
    case "Ghosts":
      screenContent = 
      <div className={`objective-board-ghost-container${toggleExpert ? " expert" : ""}`}>
      <div className="objective-board-tooltip">
        Tap on Ghost to Eliminate
      </div>
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
      break;
    case "Ghost Tests":
      screenContent =
      <div className={`all-ghost-test-container${toggleExpert ? " expert" : ""}`}>
      <div className="ghost-test-header">Hunt:</div>
        {Object.keys(ghostTests).sort((a, b) => ["Hunt Behavior","Hunt Speed","Hunt Appearance"].includes(a) ? -1 : ["Hunt Behavior","Hunt Speed","Hunt Appearance"].includes(b) ? 1 : ghostTests[a as keyof typeof ghostTests].length < ghostTests[b as keyof typeof ghostTests].length ? 1 : -1).filter(test => test.includes("Hunt") || ["Breaker","Sanity","Interaction"].includes(test)).map((test)=>{
          return <GhostTest
          ghostNames={ghostTests[test]}
          testType={test}
          display={true}
          />
          })}
        <div className="ghost-test-header">Equipment-based:</div>
        {Object.keys(ghostTests).sort((a, b) => ghostTests[a as keyof typeof ghostTests].length < ghostTests[b as keyof typeof ghostTests].length ? 1 : -1).filter(test =>
        !test.includes("Hunt") &&
        !test.includes("Breaker") &&
        !test.includes("Interaction") &&
        !test.includes("Sanity")).map((test)=>{
          return <GhostTest
          ghostNames={ghostTests[test]}
          testType={test}
          display={true}
          />
          })}
        {/* <div className="ghost-test-header">Other:</div>
        {Object.keys(ghostTests).sort((a, b) => ghostTests[a as keyof typeof ghostTests].length < ghostTests[b as keyof typeof ghostTests].length ? 1 : -1).filter(test =>
        test.includes("Breaker") ||
        test.includes("Interaction") ||
        test.includes("Sanity")).map((test)=>{
          return <GhostTest
          ghostNames={ghostTests[test]}
          testType={test}
          display={true}
          />
          })} */}
      </div>
      break;
    default:
      break;
  }

  return (
    <div className="objective-board-content">
      {screenContent}
    </div>
  );
};

export default ObjectiveBoard;
