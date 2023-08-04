import { useSelector, useDispatch } from 'react-redux';
import {handleToggleExpert, handleLightMode } from '../actions/actions';
import GhostSpeed from './GhostSpeed';
import GhostTimer from './GhostTimer';

type EvidenceType = {
  displayType: string
}

const Extras:React.FC<EvidenceType> = ({displayType}) => {
  const toggleExpert = useSelector((state: any) => state.phas.toggleExpert);
  const lightMode = useSelector((state: any) => state.phas.lightMode);
  const dispatch = useDispatch();
  let speedDisplayValues = ["Slow","Normal","Fast"]

  const handleToggleExpertAction = () =>{
    dispatch(handleToggleExpert());
  }

  const handleLightModeAction = () =>{
    dispatch(handleLightMode());
  }

  return (
    <div className="evidence-paper extras">
      <div className="paper-filters">
        <div className="ghost-speed-container">
          <div className="ghost-speed-header">
            G<span>HOST</span> S<span>PEED</span>
          </div>
          {speedDisplayValues.map((speed,index)=>{
            return <GhostSpeed
            displayText={speed}
            index={index}
            key={speed}
            aria={displayType}
            />
          })}
        </div>
        <div className="timer-container smudge">
          <div className="timer-header">
            S<span>MUDGE</span>
          </div>
          <GhostTimer
            time={180}
            key={`smudge${displayType}`}
            timerType={`smudge${displayType}`}
            intervals={[60,90,180]}
            intervalLabels={["Demon","Normal","Spirit"]} />
        </div>
        <div className="timer-container hunt">
          <div className="timer-header">
            H<span>UNT</span> C<span>OOLDOWN</span>
          </div>
          <GhostTimer
            time={25}
            key={`hunt${displayType}`}
            timerType={`hunt${displayType}`}
            intervals={[20,25]}
            intervalLabels={["Demon","Normal"]} />
        </div>
        <div className={`filter-box expert`}>
          <img alt="checkmark" src={require("../assets/check.png").default} className={!toggleExpert ? "checked" : ""}/>
          <input onChange={handleToggleExpertAction} type="checkbox" id="expert"/><label className="extra-input" htmlFor="expert"><span className="skew">Verbose Mode</span></label>
          <div className="recommended">(Recommended for Learning Players)</div>
        </div>
        <div className={`filter-box expert`}>
          <img alt="checkmark" src={require("../assets/check.png").default}/>
          <input onChange={handleLightModeAction} type="checkbox" id="light"/><label className="extra-input" htmlFor="light"><span className="skew">{lightMode ? "Back to the Asylum": "Back to the Van"}</span></label>
          <div className="recommended">{lightMode ? "(Dark Mode)": "(Light Mode)"}</div>
        </div>
      </div>
    </div>
  );
};

export default Extras;
