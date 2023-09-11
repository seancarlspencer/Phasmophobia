import React, { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {updateSpeed } from '../actions/actions';

type GhostSpeedClockType = {
  baseSpeed: number
}

const GhostSpeedClock:React.FC<GhostSpeedClockType> = ({baseSpeed}) => {
  const speedValues = useSelector((state: any) => state.phas.speedValues);
  const [playStatus,setPlayStatus] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=>{
    // Timer works by declaring an interval
    if(playStatus){
      playFootsteps();
    }
    if (!playStatus){
      //stop Animate Bar
      document.querySelectorAll<HTMLDivElement>(".clock-selector-footsteps").forEach((el)=>{
        el.dataset.clockrunning = "false";
      })
    }
  },[playStatus])

  const playFootsteps = () =>{
    if(playStatus){
      //Animate bar based on Base Speed
      document.querySelectorAll<HTMLDivElement>(".clock-selector-footsteps").forEach((el)=>{
        el.dataset.clockrunning = "true";
      })
    }
  }

  const startStopTimer = ()=>{
    setPlayStatus(playStatus => !playStatus);
  }

  return (
    <div className="ghost-speed-clock">
      <div className={`play-button`} onClick={startStopTimer}>
        <div className={`contained-button${playStatus ? " pause": " play"}`}>

        </div>
      </div>
      <div className="timer-bar">
        <div className={`fill-bar`}>
          
        </div>
        <div className="interval-container clock-selector-footsteps" data-clockrunning="false">
          <div className="interval"></div>
        </div>
        {/* {intervals.map((interval,index)=>{
          return <div className="interval-container" key={index} style={{
            left: `${interval/time * 100}%`
          }}>
            <div className="interval"></div>
            <div className="interval-label">{intervalLabels[index]}</div>
          </div>
        })} */}
      </div>
      <div className="footstep-animation">
        <img className="footstep-left clock-selector-footsteps" data-clockrunning="false" alt="footstep-left" src={require('../assets/footstep.png').default}/>
        <img className="footstep-right clock-selector-footsteps" data-clockrunning="false" alt="footstep-right" src={require('../assets/footstep.png').default}/>
      </div>
    </div>
  );
};

export default GhostSpeedClock;
