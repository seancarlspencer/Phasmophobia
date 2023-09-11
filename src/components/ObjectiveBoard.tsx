import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleObjectiveBoardScreen, updateGuessArray, updatePossible } from '../actions/actions';
import phasGhosts from '../assets/phasEvidenceParsed.json';
import Items from '../assets/Items.json';
import Ghost from './Ghost';
// import GhostTest from './GhostTest';
import {MemoizedGhostTest} from './GhostTest';
import { render } from '@testing-library/react';
import Item from './Item';

const ObjectiveBoard = () => {
  const evidenceValues = useSelector((state: any) => state.phas.evidenceValues);
  const eliminatedValues = useSelector((state: any) => state.phas.eliminatedValues);
  const evidenceNumber = useSelector((state: any) => state.phas.evidenceNumber);
  const checkSpeed = useSelector((state: any) => state.phas.checkSpeed);
  const toggleExpert = useSelector((state: any) => state.phas.toggleExpert);
  const speedValues = useSelector((state: any) => state.phas.speedValues);
  const guessArray = useSelector((state: any) => state.phas.guessArray);
  const objectiveBoardScreen = useSelector((state: any) => state.phas.objectiveBoardScreen);
  const completedTasks = useSelector((state: any) => state.phas.completedTasks);
  const mobileView = useSelector((state: any) => state.phas.mobileView);


  const [expandInstructions,setInstructions] = useState(false);
  const [expandHunt,setHunt] = useState(true);
  const [expandInteractions,setInteractions] = useState(true);
  const [expandEquipment,setEquipment] = useState(true);
  const [expandCompleted,setCompleted] = useState(true);
  const [expandTestOptions,setTestOptions] = useState(true);
  const [definitive,setDefinitive] = useState(false);
  const [itemStart,setItemStart] = useState(0);
  const dispatch = useDispatch();

  type ghostTestType = {
    [key: string]: Array<any[]>
  }

  type renderTestType = string[]

  const [ghostTests,setGhostTests] = useState<ghostTestType>({})
  const [equipmentTests,setEquipmentTests] = useState<renderTestType>([])
  const [huntTests,setHuntTests] = useState<renderTestType>([])
  const [interactionTests,setInteractionTests] = useState<renderTestType>([])
  const [completedTests,setCompletedTests] = useState<renderTestType>([])

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
      if(evidenceValues[x] || eliminatedValues[x]){
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

        let sortedCalc = Object.keys(ghostTestsTemp).sort((a, b) => ghostTestsTemp[a as keyof typeof ghostTestsTemp].length < ghostTestsTemp[b as keyof typeof ghostTestsTemp].length ? 1 : -1);



        setGhostTests(ghostTestsTemp);
        setEquipmentTests(sortedCalc.filter(test =>
          !["Breaker","Sanity","Activity","Room","Events","Environment","Breaker & Lights","Cursed Possessions"].includes(test) &&
          !test.includes("Hunt")));
        setInteractionTests(sortedCalc.filter(test => (["Breaker","Sanity","Activity","Room","Events","Environment","Breaker & Lights","Cursed Possessions"].includes(test))));
        setHuntTests(sortedCalc.filter(test => (test.includes("Hunt"))).sort((a, b) => ["Hunt Appearance","Hunt Behavior","Hunt Speed"].indexOf(a) > ["Hunt Behavior","Hunt Speed","Hunt Appearance"].indexOf(b) ? -1 : 1));
        setCompletedTests(sortedCalc);


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

    let sortedCalc = Object.keys(ghostTestsTemp).sort((a, b) => ghostTestsTemp[a as keyof typeof ghostTestsTemp].length < ghostTestsTemp[b as keyof typeof ghostTestsTemp].length ? 1 : -1);

    setGhostTests(ghostTestsTemp);
    setEquipmentTests(sortedCalc.filter(test =>
      !["Breaker","Sanity","Activity","Room","Events","Environment","Breaker & Lights","Cursed Possessions"].includes(test) &&
      !test.includes("Hunt")));
    setInteractionTests(sortedCalc.filter(test => (["Breaker","Sanity","Activity","Room","Events","Environment","Breaker & Lights","Cursed Possessions"].includes(test))));
    setHuntTests(sortedCalc.filter(test => (test.includes("Hunt"))).sort((a, b) => ["Hunt Appearance","Hunt Behavior","Hunt Speed"].indexOf(a) > ["Hunt Behavior","Hunt Speed","Hunt Appearance"].indexOf(b) ? -1 : 1));
    setCompletedTests(sortedCalc);


    possibleValues = [true,true,true,true,true,true,true];
    handlePossible(possibleValues);
  },[evidenceValues,speedValues,eliminatedValues])

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
        <div className={`ghost-test-header guide${expandInstructions ? " expand" : ""}`}>
          <div className={`expand-instructions${expandInstructions ? " expand" : ""}`} onClick={()=>setInstructions(expandInstructions => !expandInstructions)}>☰ INSTRUCTIONS
          <br/><br/>
          (Recommended for Insane/0 Evidence Modes)
          <br/><br/>
          This is a list of Unique Ghost Tests you can perform.
          <br/><br/>
          It will update based on your current evidence and which ghosts you eliminated.
          <br/>
          It will also eliminate ghosts for you on your behalf as you use it.
          <br/><br/>
          The "Ghosts" and the "Ghost Tests" tabs work together.  Any ghosts eliminated on one will be eliminated in the other.
          <br/><br/>
        <ul><span>HOW TO USE:</span><br/><br/>
          <li>Fill out Evidence/Speed details like you normally would.  This will update your test list.</li>
          <li>TAP each ghost to ELIMINATE THEM as you test their unique aspects.</li>
          <li>CHECK OFF entire lists to ELIMINATE ALL GHOSTS in that list (E.G. if Hunt Speed seems normal & unchanging).</li>
          <li>Any redundant tasks will be eliminated for you based on your eliminations.</li>
        </ul>
        </div>
      </div>
      {/* <div className={`specific-test-container-container`}>
        <div className="ghost-test-header"><span>Options</span></div>
        <div className="ghost-test-options">
          <div className="toggle-definitive-container">
            <div className={`definitive-toggle${definitive ? " only-definitive" : ""}`} onClick={()=>{setDefinitive(definitive => !definitive)}}>
              <div className="definitive-toggle-shape"></div>
            </div>
            <div className="toggle-definitive">Definitive Tests Only</div>
            <div className="definitive-tooltip">
              Only show tests that guarantee either identifying or eliminating a ghost option
            </div>
            </div>
        </div>
      </div> */}
      <div className={`specific-test-container-container${expandEquipment ? " expand" : ""}`}>
        <div className="ghost-test-header" onClick={()=>setEquipment(expandEquipment => !expandEquipment)}><span>☰ Equipment-based Tests</span></div>
        <div className={`specific-test-container`}>
        {equipmentTests.map((test)=>{
          let ghostNamesParsed = evidenceNumber == 0 ? [...ghostTests[test]].filter(ghost=>ghost[2] != undefined ? !(ghost[2].includes("(Requires 1 evidence)")) : true) : ghostTests[test];
          // If 0 evidence, filter out ghosts that have tests that require 1 evidence.

          if(definitive){
            ghostNamesParsed = ghostNamesParsed.filter(ghost=>ghost[2] != undefined ? !(ghost[2].includes("(Not definitive)")) : true)
          }
          // If definitive, filter out ghosts that have not definitive tests.

          if (ghostNamesParsed.length <1){
            return;
          }
          
          return <MemoizedGhostTest
          ghostNames={ghostNamesParsed}
          // ghostNames={evidenceNumber == 0 ? ghostTests[test].filter(ghost=>ghost[2] != undefined ? !(ghost[2].includes("(Requires 1 evidence)")) : true) : ghostTests[test]}
          testType={test}
          display={true}
          completed={false}
          key={`equipment-${test}`}
          ghostNamesChecked={ghostNamesParsed.map((ghost)=>{
            return guessArray[ghost[1]];
          })}
          />
          })}
      </div>
      </div>
      <div className={`specific-test-container-container${expandInteractions ? " expand" : ""}`}>
        <div className="ghost-test-header" onClick={()=>setInteractions(expandInteractions => !expandInteractions)}><span>☰ Unique Interactions</span></div>
        <div className={`specific-test-container`}>
        {interactionTests.map((test)=>{
          let ghostNamesParsed = evidenceNumber == 0 ? [...ghostTests[test]].filter(ghost=>ghost[2] != undefined ? !(ghost[2].includes("(Requires 1 evidence)")) : true) : ghostTests[test];
          if(definitive){
            ghostNamesParsed = ghostNamesParsed.filter(ghost=>ghost[2] != undefined ? !(ghost[2].includes("(Not definitive)")) : true)
          }
          if (ghostNamesParsed.length <1){
            return;
          }
            return <MemoizedGhostTest
              ghostNames={ghostNamesParsed}
              testType={test}
              display={true}
              completed={false}
              key={`interaction-${test}`}
              ghostNamesChecked={ghostNamesParsed.map((ghost)=>{
                return guessArray[ghost[1]];
              })}
              />
          })}
      </div>
      </div>
      <div className={`specific-test-container-container${expandHunt ? " expand" : ""}`}>
        <div className="ghost-test-header" onClick={()=>setHunt(expandHunt => !expandHunt)}><span>☰ Unique Hunting Traits</span></div>
        <div className={`specific-test-container`}>
        {huntTests.map((test)=>{
          let ghostNamesParsed = evidenceNumber == 0 ? [...ghostTests[test]].filter(ghost=>ghost[2] != undefined ? !(ghost[2].includes("(Requires 1 evidence)")) : true) : ghostTests[test];
          if(definitive){
            ghostNamesParsed = ghostNamesParsed.filter(ghost=>ghost[2] != undefined ? !(ghost[2].includes("(Not definitive)")) : true)
          }
          if (ghostNamesParsed.length <1){
            return;
          }
            return <MemoizedGhostTest
              ghostNames={ghostNamesParsed}
              testType={test}
              display={true}
              completed={false}
              key={`hunt-${test}`}
              ghostNamesChecked={ghostNamesParsed.map((ghost)=>{
                return guessArray[ghost[1]];
              })}
              />
          })}
        </div>
      </div>
      <div className={`specific-test-container-container${expandCompleted ? " expand" : ""}`}>
        <div className="ghost-test-header" onClick={()=>setCompleted(expandCompleted => !expandCompleted)}><span>☰ Completed</span></div>
        <div className={`specific-test-container`}>
        {completedTests.map((test)=>{
          let renderComplete = true;
          ghostTests[test].forEach((name)=>{
            if (!guessArray[name[1]]){
              renderComplete=false;
            }
            else{
            }
          })
          if (!renderComplete){
            return;
          }
          // else if(evidenceNumber == 0){
          //   if(ghostTests[test].filter(ghost=>ghost[2] != undefined
          //     ? !(ghost[2].includes("(Requires 1 evidence)")) : true).length >= 1 ? false : true){
          //       return;
          //     }
          // }
          let ghostNamesParsed = evidenceNumber == 0 ? [...ghostTests[test]].filter(ghost=>ghost[2] != undefined ? !(ghost[2].includes("(Requires 1 evidence)")) : true) : ghostTests[test];
          if(definitive){
            ghostNamesParsed = ghostNamesParsed.filter(ghost=>ghost[2] != undefined ? !(ghost[2].includes("(Not definitive)")) : true)
          }
          if (ghostNamesParsed.length <1){
            return;
          }
          return <MemoizedGhostTest
          ghostNames={ghostNamesParsed}
          testType={test}
          display={true}
          completed={true}
          key={`complete-${test}`}
          ghostNamesChecked={ghostNamesParsed.map((ghost)=>{
            return guessArray[ghost[1]];
          })}
          />
          })}
          </div>
      </div>
      </div>
      break;
      case "Items":
      screenContent =
      <div className="items-screen-container">
        <div className="tiers-container">
          {mobileView ?
          <div className="item-page-buttons">
            <div className="item-page" data-selected={`${itemStart==0}`} onClick={()=>setItemStart(0)}>Page 1</div>
            <div className="item-page" data-selected={`${itemStart==5}`} onClick={()=>setItemStart(5)}>Page 2</div>
            <div className="item-page" data-selected={`${itemStart==10}`} onClick={()=>setItemStart(10)}>Page 3</div>
            <div className="item-page" data-selected={`${itemStart==15}`} onClick={()=>setItemStart(15)}>Page 4</div>
          </div>
          :null}
          <div className="tiers-header-container tiers-row">
            <div className="tiers-header">Item</div>
            <div className="tiers-header">Tier I</div>
            <div className="tiers-header">Tier II</div>
            <div className="tiers-header">Tier III</div>
          </div>
          {mobileView ? 
          Object.keys(Items).map((item,index)=>{
            if(index >= itemStart && index < itemStart+5){
              return <Item
                itemName={item}
                level={Items[item as keyof typeof Items]["level"]}
                consumable={Items[item as keyof typeof Items]["consumable"]}
                descriptor={Items[item as keyof typeof Items]["descriptor"]}
                descriptorValues={Items[item as keyof typeof Items]["descriptorValues"]}
                range={Items[item as keyof typeof Items]["range"]}
                price={Items[item as keyof typeof Items]["price"]}
                electronic={Items[item as keyof typeof Items]["electronic"]}
                uses={Items[item as keyof typeof Items]["uses"]}
                descriptions={Items[item as keyof typeof Items]["descriptions"]}
                priceToUnlock={Items[item as keyof typeof Items]["priceToUnlock"]}
              />
            }
          })
          :
          Object.keys(Items).map((item,index)=>{
              return <Item
                itemName={item}
                level={Items[item as keyof typeof Items]["level"]}
                consumable={Items[item as keyof typeof Items]["consumable"]}
                descriptor={Items[item as keyof typeof Items]["descriptor"]}
                descriptorValues={Items[item as keyof typeof Items]["descriptorValues"]}
                range={Items[item as keyof typeof Items]["range"]}
                price={Items[item as keyof typeof Items]["price"]}
                electronic={Items[item as keyof typeof Items]["electronic"]}
                uses={Items[item as keyof typeof Items]["uses"]}
                descriptions={Items[item as keyof typeof Items]["descriptions"]}
                priceToUnlock={Items[item as keyof typeof Items]["priceToUnlock"]}
              />
          })}
        </div>
      </div>
      break;
      case "v0.9.0.0 Disclaimer":
      default:
        screenContent =
        <div className="disclaimer">
          <p className="disclaimer-important">Site Update to v0.9.0.X Status: <b>Mostly Complete</b></p>
          <p>I will be making frequent updates to the site throughout this week as I learn more information about the new patch.</p>
          <p>Please note that many of these updates are derived based on patch notes and player findings.  Thus, they may be subject to change</p>
          <p>Once information is finalized/confirmed, I will include it in other tabs.</p>
          <ul>Notable Gameplay Changes from v0.8.1.7 to v0.9.0.X (NOT FINALIZED!)
            <li className="disclaimer-topic"><b>Freezing Temperatures:</b>
            <ul>
              <li>Cold Breath no longer means it is Freezing Temperatures. (Appears below 5 degrees)</li>
              <li>Freezing Temperatures must be confirmed by using a Thermometer. (At or below 0 degrees)</li>
              <li>Cold breath is now useful for discovering where the Ghost Room is in some situations.</li>
            </ul>
            </li>
            <li className="disclaimer-topic"><b>Smudge Sticks/Incense:</b>
            <ul>
              <li>Renamed to Incense.</li>
              <li>Smudge Timers during a hunt are now dependent on Tier.</li>
              <li>The Moroi's extended Smudge effect will be 50% longer than whatever smudge is used, making higher tier Smudges more noticable.</li>
            </ul>
            </li>
            <li className="disclaimer-topic"><b>Crucifix:</b>
            <ul>
              <li>Crucifix range is based on tier.</li>
              <li>The Demon's extended Crucifix range will be 50% larger than whatever crucifix is used, making higher tier crucifixes more noticable.</li>
            </ul>
            </li>
            <li className="disclaimer-topic"><b>Fingerprints/Ultraviolet:</b>
            <ul>
              <li>Fingerprints is now Ultraviolet.</li>
              <li>Ultraviolet Footprints now count as Ultraviolet Evidence.</li>
            </ul>
            </li>
            <li className="disclaimer-topic"><b>Candles:</b>
            <ul>
              <li>Candles no longer prevent 100% Sanity Drain.</li>
              <li>Instead, they slow down Sanity Drain depending on Tier.</li>
              <li>When a ghost blows out a candle, it will leave EMF.</li>
            </ul>
            </li>
            <li className="disclaimer-topic"><b>Sound Sensors:</b>
            <ul>
            <li>Sound Sensors now have an adjustable range in the Van.</li>
            </ul>
            </li>
            <li className="disclaimer-topic"><b>D.O.T.S.:</b>
            <ul>
            <li>D.O.T.S. is now based on the Ghost's actual position, and reveals when the Ghost enters a "D.O.T.S. State."</li>
            <li>D.O.T.S. photo will count as ghost photo.</li>
            <li>Banshee will now move towards its target when in D.O.T.S. state.</li>
            </ul>
            </li>
            <li className="disclaimer-topic"><b>Tripods:</b>
            <ul>
              <li>Ghosts can now rarely knock over Tripods.</li>
            </ul>
            </li>
          </ul>
          <p>If you learn anything new about the Patch that you think should be included here, please reach out to me on Discord, ID: damiascus</p>
        </div>
        break;
  }

  return (
    <div className={`objective-board-content ${objectiveBoardScreen.toLocaleLowerCase().replaceAll(" ","-").replaceAll(".","-")}`}>
      {screenContent}
    </div>
  );
};

export default ObjectiveBoard;
