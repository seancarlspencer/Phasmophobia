import { useEffect, useState } from 'react';
import Evidence from './Evidence';
import ObjectiveBoard from './ObjectiveBoard';
import Extras from './Extras';
import { handleObjectiveBoardScreen, updateLoading } from '../actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import ReactGA from 'react-ga';
import {Link, useSearchParams} from 'react-router-dom'

export type THomepage = {
  objectiveScreen : string
}

const Homepage:React.FC<THomepage> = ({objectiveScreen}) => {
  const [toggleSticky,setToggleSticky] = useState(false);
  const objectiveBoardScreen = useSelector((state:any) => state.phas.objectiveBoardScreen);
  // const [searchParams, setSearchParams] = useSearchParams();
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

    // document.addEventListener("wheel", function(e){
    //   // prevent the default scrolling event

    //   // scroll the div if the mouse is on the left of the div, otherwise, let default scroll take over.
    //   if(target && (target.getBoundingClientRect().left > e.clientX || target.getBoundingClientRect().right < e.clientX)){
    //     target.scrollBy(e.deltaX,e.deltaY > 0 ? 100 : -100);
    //   }
    // })
  },[])

  // useEffect(()=>{
  //   const url = new URL("https://phasmophobia.seancsapps.com/");
  //   url.searchParams.set("foo", "bar");
  //   setSearchParams({
  //     screen:objectiveBoardScreen
  //   })
  // })

  useEffect(()=>{
    let objDiv = document.querySelector(".objective-board-content");
    if(objDiv){
      objDiv.scroll(0,0);
    }
  },[objectiveScreen])

  const handleObjectiveBoard = (screen: string) => {
    // ReactGA.pageview(`/${screen.toLocaleLowerCase().replaceAll(" ","-").replaceAll(".","-")}`);
    dispatch(handleObjectiveBoardScreen(screen));
  }

  return (
    <main className={`homepage${toggleSticky ? " hide" : ""}${loading ? " loading" : ""}`}>
      <div className="objective-board-container">
        <div className="headings">
          <h1>Phasmophobia Cheat Sheet</h1>
          <h2>by Damiascus</h2>
        </div>
        <div className={`evidence evidence-1`}>
          <Evidence displayType='standard'/>
        </div>
        <div className={'evidence evidence-2'}>
          <Extras displayType='standard'/>
        </div>
        <div className="objective-board-tab-container">
          <div className="objective-board-page-selector">
              <Link to="/" key={"Ghosts"} className={`page-selector${objectiveScreen=="" ? " active" : ""}`} onClick={()=>handleObjectiveBoard("Ghosts")}><span>Ghosts</span></Link>
              <Link to="/tests" key={"Ghost Tests"} className={`page-selector${objectiveScreen=="tests" ? " active" : ""}`} onClick={()=>handleObjectiveBoard("Ghost Tests")}><span>Tests</span></Link>
              <Link to="/items" key={"Items"} className={`page-selector${objectiveScreen=="items" ? " active" : ""}`} onClick={()=>handleObjectiveBoard("Items")}><span>Items</span></Link>
              <Link to="/disclaimer" key={"v0.9.0.0 Disclaimer"} className={`page-selector${objectiveScreen=="disclaimer" ? " active" : ""}`} onClick={()=>handleObjectiveBoard("v0.9.0.0 Disclaimer")}><span>v0.9 Disclaimer</span></Link>
          </div>
          <div className={`objective-board${loading ? " loading" : ""}`}>
            <ObjectiveBoard
            objectiveScreen={objectiveScreen}
            />
          </div>
        </div>
      </div>
      
    </main>
  );
};

export default Homepage;
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}

