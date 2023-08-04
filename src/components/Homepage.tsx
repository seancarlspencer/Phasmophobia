import { useEffect, useState } from 'react';
import Evidence from './Evidence';
import ObjectiveBoard from './ObjectiveBoard';
import Extras from './Extras';

const Homepage = () => {
  const [toggleSticky,setToggleSticky] = useState(false);

  useEffect(()=>{
    if (localStorage.getItem("lightMode")==="true"){
      document.documentElement.setAttribute('data-theme', 'light');
    }
    else{
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    const target = document.querySelector(".objective-board-content");

    document.addEventListener("wheel", function(e){
      // prevent the default scrolling event

      // scroll the div if the mouse is on the left of the div, otherwise, let default scroll take over.
      if(target && (target.getBoundingClientRect().left > e.clientX || target.getBoundingClientRect().right < e.clientX)){
        target.scrollBy(e.deltaX,e.deltaY > 0 ? 100 : -100);
      }
    })
  },)

  return (
    <div className={`homepage${toggleSticky ? " hide" : ""}`}>
      <div className="objective-board-container">
        <div className={`evidence evidence-1`}>
          <Evidence displayType='standard'/>
        </div>
        <div className={'evidence evidence-2'}>
          <Extras displayType='standard'/>
        </div>
        <div className="objective-board">
          <ObjectiveBoard/>
        </div>
      </div>
      
    </div>
  );
};

export default Homepage;
