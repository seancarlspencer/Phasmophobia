import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleToggleStickyAction, updateMobileView } from '../actions/actions';
import Evidence from './Evidence';
import Extras from './Extras';

const EvidenceMobile = () => {
  const toggleSticky = useSelector((state: any) => state.phas.toggleSticky);
  const mobileView = useSelector((state: any) => state.phas.mobileView);
  const [evidenceScreenOn, toggleEvidenceScreenOn] = useState(true);
  const dispatch = useDispatch();

  if(window.screen.width < 912){
    dispatch(updateMobileView(true));
  }

  useEffect(() =>{
    window.addEventListener("resize",(e)=>{
      if(window.screen.width < 912){
        if(!mobileView){
          dispatch(updateMobileView(true));
        }
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
      else{
        if(mobileView){
          dispatch(updateMobileView(false));
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
      {evidenceScreenOn ? <Evidence displayType='mobile'/> : <Extras displayType='mobile'/>}
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
