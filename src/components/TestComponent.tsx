import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateGuessArray } from '../actions/actions';
import Ghost from './Ghost';

interface GhostTestInterface{
  ghostNames: Array<any>
  display: boolean
  testType: string
  completed: boolean
}

const TestComponent: React.FC<GhostTestInterface> = ({ghostNames,display, testType, completed}) => {
  const evidenceValues = useSelector((state:any) => state.phas.evidenceValues);
  // const guessArray = useSelector((state: any) => state.phas.guessArray);
  const loading = useSelector((state: any) => state.phas.loading);
  const [toggleGuess,setGuess] = useState(false);
  const [toggleComplete,setComplete] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=>{
    console.log("rerendering");
  })

  useEffect(()=>{
    //Check if should be checked.
    if(loading || !display || completed){
      return;
    }
  },[evidenceValues,ghostNames])


  return <div></div>
};

// export default GhostTest;

const MemoizedTest = React.memo(TestComponent, (props,nextProps)=>{
  if(props.display!=nextProps.display){
    return false;
  }
  if(props.completed!=nextProps.completed){
    return false;
  }
  if(props.ghostNames.length!=nextProps.ghostNames.length){
    return false;
  }
  // console.log("not rerendering");
  return true;
});

export {MemoizedTest}
