import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, handleToggleStickyAction } from '../actions/actions';
import Evidence from './Evidence';
import GhostSpeed from './GhostSpeed';
import ObjectiveBoard from './ObjectiveBoard';
import Extras from './Extras';

const EvidenceMobile = () => {
  const toggleSticky = useSelector((state: any) => state.phas.toggleSticky);
  const [evidenceScreenOn, toggleEvidenceScreenOn] = useState(true);
  const dispatch = useDispatch();

  useEffect(() =>{
    window.addEventListener("resize",(e)=>{
      if(window.screen.width < 912){
        var offsetHeight = document.querySelector<HTMLDivElement>('.evidence');
        var objectiveBoard = document.querySelector<HTMLDivElement>('.homepage');
        if (offsetHeight && objectiveBoard && toggleSticky){
          // console.log(offsetHeight.offsetHeight);
          objectiveBoard.style.transform = `translateY(${offsetHeight.offsetHeight}px)`;
        }
        else if (offsetHeight && objectiveBoard && !toggleSticky){
          // console.log(offsetHeight.offsetHeight);
          objectiveBoard.style.transform = `translateY(0px)`;
        }
      }
    })
    var offsetHeight = document.querySelector<HTMLDivElement>('.evidence');
    var objectiveBoard = document.querySelector<HTMLDivElement>('.homepage');
    if (offsetHeight && objectiveBoard && toggleSticky){
      // console.log(offsetHeight.offsetHeight);
      objectiveBoard.style.transform = `translateY(${offsetHeight.offsetHeight}px)`;
    }
    else if (offsetHeight && objectiveBoard && !toggleSticky){
      // console.log(offsetHeight.offsetHeight);
      objectiveBoard.style.transform = `translateY(0px)`;
    }
  });

  const handleToggleEvidenceScreen = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    toggleEvidenceScreenOn(evidenceScreenOn => !evidenceScreenOn);
    if(!toggleSticky){
      handleToggleSticky(e);
    }
    var offsetHeight = document.querySelector<HTMLDivElement>('.evidence');
    var objectiveBoard = document.querySelector<HTMLDivElement>('.homepage');
    if(objectiveBoard){
      objectiveBoard.style.transition = "none";
      setTimeout(()=>{
        var objectiveBoard = document.querySelector<HTMLDivElement>('.homepage');
        if(objectiveBoard){
          objectiveBoard.style.transition = `transform .2s ease-in 0s`;
        }
      },50)
    }
  }

  const handleToggleSticky = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    dispatch(handleToggleStickyAction())
    var offsetHeight = document.querySelector<HTMLDivElement>('.evidence');
    var objectiveBoard = document.querySelector<HTMLDivElement>('.homepage');
    if (offsetHeight && objectiveBoard && !toggleSticky){
      // console.log(offsetHeight.offsetHeight);
      objectiveBoard.style.transform = `translateY(${offsetHeight.offsetHeight}px)`;
    }
    else if (offsetHeight && objectiveBoard && toggleSticky){
      // console.log(offsetHeight.offsetHeight);
      objectiveBoard.style.transform = `translateY(0px)`;
    }
  }

  return (
    <div className={`evidence mobile${toggleSticky ? " hide" : ""}`}>
      {evidenceScreenOn ? <Evidence/> : <Extras />}
      <div className="sticky-remover-container">
      <div onClick={handleToggleEvidenceScreen} className="evidence-screen-switcher">
        <span>{evidenceScreenOn ? "More Options" : "Back to Evidence"}</span>
      </div>
      <div onClick={handleToggleSticky} className="sticky-remover">
        <span>{toggleSticky ? "Hide" : "Show"}</span>
      </div>
      </div>
    </div>
  );
};

export default EvidenceMobile;
