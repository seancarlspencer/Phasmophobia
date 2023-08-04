import React, { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {updateSpeed } from '../actions/actions';

type GhostTimerType = {
  time: number,
  intervals: number[],
  intervalLabels: string[],
  timerType: string
}

const GhostTimer:React.FC<GhostTimerType> = ({time,intervals,intervalLabels,timerType}) => {
  const speedValues = useSelector((state: any) => state.phas.speedValues);
  const [playStatus,setPlayStatus] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=>{
    // Timer works by declaring an interval
    let i=0;
    const intervalLoop = setInterval(()=>{
      if(playStatus && i<time){
        fillBarEdit(++i);
      }
      else{
        clearInterval(intervalLoop);
        setPlayStatus(false);
      }
    },(1000));
    if (!playStatus){
      let fillDiv = document.querySelector<HTMLDivElement>(`.fill-bar.${timerType}`);
      if(fillDiv){
        fillDiv.style.width = "0%";
      }
    }
    return () => {
      // clears timeout before running the new effect
      clearInterval(intervalLoop);
    };
  },[playStatus])

  const fillBarEdit = (i: number) =>{
    if(playStatus){
      let fillDiv = document.querySelector<HTMLDivElement>(`.fill-bar.${timerType}`);
      fillDiv!.style.width = `${i/time * 100}%`
    }
  }

  const startStopTimer = ()=>{
    setPlayStatus(playStatus => !playStatus);
  }

  return (
    <div className="ghost-timer">
      <div className={`play-button`} onClick={startStopTimer}>
        <div className={`contained-button${playStatus ? " pause": " play"}`}>

        </div>
      </div>
      <div className="timer-bar">
        <div className={`fill-bar ${timerType}`}>
          
        </div>
        {intervals.map((interval,index)=>{
          return <div className="interval-container" style={{
            left: `${interval/time * 100}%`
          }}>
            <div className="interval"></div>
            <div className="interval-label">{intervalLabels[index]}</div>
          </div>
        })}
      </div>
    </div>
  );
};

export default GhostTimer;
