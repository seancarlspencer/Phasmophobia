import { useEffect, useState } from 'react';
import Evidence from './Evidence';
import ObjectiveBoard from './ObjectiveBoard';
import Extras from './Extras';
import { handleObjectiveBoardScreen, updateLoading } from '../actions/actions';
import { useDispatch, useSelector } from 'react-redux';

const Homepage = () => {
  const [toggleSticky,setToggleSticky] = useState(false);
  const objectiveBoardScreen = useSelector((state:any) => state.phas.objectiveBoardScreen);
  const loading = useSelector((state:any) => state.phas.loading);
  const dispatch = useDispatch();

  useEffect(()=>{
    if (localStorage.getItem("lightMode")==="true"){
      document.documentElement.setAttribute('data-theme', 'light');
    }
    else{
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    const target = document.querySelector(".objective-board-content");
    setTimeout(()=>{
      dispatch(updateLoading());
    },50)

    document.addEventListener("wheel", function(e){
      // prevent the default scrolling event

      // scroll the div if the mouse is on the left of the div, otherwise, let default scroll take over.
      if(target && (target.getBoundingClientRect().left > e.clientX || target.getBoundingClientRect().right < e.clientX)){
        target.scrollBy(e.deltaX,e.deltaY > 0 ? 100 : -100);
      }
    })
  })

  const handleObjectiveBoard = (screen: string) => {
    dispatch(handleObjectiveBoardScreen(screen));
  }

  return (
    <div className={`homepage${toggleSticky ? " hide" : ""}${loading ? " loading" : ""}`}>
      <div className="objective-board-container">
        <div className={`evidence evidence-1`}>
          <Evidence displayType='standard'/>
        </div>
        <div className={'evidence evidence-2'}>
          <Extras displayType='standard'/>
        </div>
        <div className="objective-board-tab-container">
          <div className="objective-board-page-selector">
              <div key={"Ghosts"} className={`page-selector${objectiveBoardScreen=="Ghosts" ? " active" : ""}`} onClick={()=>handleObjectiveBoard("Ghosts")}><span>Ghosts</span></div>
              <div key={"Ghost Tests"} className={`page-selector${objectiveBoardScreen=="Ghost Tests" ? " active" : ""}`} onClick={()=>handleObjectiveBoard("Ghost Tests")}><span>Ghost Tests</span></div>
              <div key={"v0.9.0.0 Disclaimer"} className={`page-selector${objectiveBoardScreen=="v0.9.0.0 Disclaimer" ? " active" : ""}`} onClick={()=>handleObjectiveBoard("v0.9.0.0 Disclaimer")}><span>v0.9.0.0 Disclaimer</span></div>
            </div>
          <div className={`objective-board${loading ? " loading" : ""}`}>
            <ObjectiveBoard/>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Homepage;
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}

