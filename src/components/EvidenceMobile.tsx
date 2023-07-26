import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, handleToggleStickyAction } from '../actions/actions';
import Evidence from './Evidence';
import ObjectiveBoard from './ObjectiveBoard';

const EvidenceMobile = () => {
  const evidenceValues = useSelector((state: any) => state.phas.evidenceValues);
  const toggleSticky = useSelector((state: any) => state.phas.toggleSticky);
  const dispatch = useDispatch();

  useEffect(() =>{
    var offsetHeight = document.querySelector<HTMLDivElement>('.evidence');
    var objectiveBoard = document.querySelector<HTMLDivElement>('.homepage');
    if (offsetHeight && objectiveBoard && toggleSticky){
      console.log(offsetHeight.offsetHeight);
      objectiveBoard.style.transform = `translateY(${offsetHeight.offsetHeight}px)`;
    }
    else if (offsetHeight && objectiveBoard && !toggleSticky){
      console.log(offsetHeight.offsetHeight);
      objectiveBoard.style.transform = `translateY(0px)`;
    }
  });

  const handleToggleSticky = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    dispatch(handleToggleStickyAction())
    var offsetHeight = document.querySelector<HTMLDivElement>('.evidence');
    var objectiveBoard = document.querySelector<HTMLDivElement>('.homepage');
    if (offsetHeight && objectiveBoard && !toggleSticky){
      console.log(offsetHeight.offsetHeight);
      objectiveBoard.style.transform = `translateY(${offsetHeight.offsetHeight}px)`;
    }
    else if (offsetHeight && objectiveBoard && toggleSticky){
      console.log(offsetHeight.offsetHeight);
      objectiveBoard.style.transform = `translateY(0px)`;
    }
  }

  return (
    <div className={`evidence evidence-1 mobile${toggleSticky ? " hide" : ""}`}>
      <Evidence/>
      <div onClick={handleToggleSticky} className="sticky-remover">
        {toggleSticky ? "Hide Evidence" : "Show Evidence"}
      </div>
    </div>
  );
};

export default EvidenceMobile;
