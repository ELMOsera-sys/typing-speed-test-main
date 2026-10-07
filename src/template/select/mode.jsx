import {useState,useContext,useEffect} from "react" 
import Icon from "../icon.jsx"
import {StateContext} from "../Context/stateContext.jsx"

function Mode(){
    const [active, setActive] = useState(false);
    const {state,dispatch,setStateBar,stateBar} = useContext(StateContext);
    const [mode,setMode] = useState(state.mode || "timed");

    const handleModeChange = (newMode) => {
        setMode(newMode);
        setStateBar(prev=>({...prev, 
          firstTry:true,
          time:mode==="timed" ? 60 : 0,
          wpm:0,
          accuracy:100
        }));
        dispatch({type:"mode",payload:{mode: newMode}});
        dispatch({type:"reset"});
        
    };
    useEffect(()=>{
      setStateBar(prev=>({...prev,
        time:mode==="timed" ? 60 : 0,
      }))
    },[mode,state.started])
    
    useEffect(()=>{
      if(!state.started && !state.ended) return;
      if(state.ended) return;
      
      const timer = setInterval(() => {
         setStateBar(prev => ({
          ...prev,
          time: state.mode === "timed"
           ? prev.time - 1
           : prev.time + 1
         }));
          }, 1000);
      return () => clearInterval(timer);
      
    },[state.started])

    

    return (
        <div className=" relative md:flex md:flex-row md:static md:items-center"
        onClick={() => setActive(!active)}>
              <p className=" 
                difficulty-option mb-3 w-[10rem] text-center border-2
                border-neutral-500 rounded-sm p-1 cursor-pointer
                hover:animate-pulse active:animate-bounce md:hidden ">
                  {mode === "timed" ? "Timed (60s)" : "Passage"}
                  <Icon name="downArrow" 
                className={`ml-2 inline-block transform `+ (active ? "rotate-180" : "")} />
                </p>
                <p className="hidden cursor-pointer md:block">Mode:</p>
             <ul className={`text-center cursor-pointer absolute z-40 left-3 cursor-pointer
                bg-neutral-800 p-1 w-[9rem] flex flex-col gap-1.5 md:block md:w-full md:static md:flex md:flex-row md:bg-neutral-900
                animate__animated` + (!active ? " hidden" : "")}>
                <li className={`relative before:absolute  bullet ${mode==="timed" ? "actif" : ""}`}
                  
                  onClick={()=>{
                     handleModeChange("timed")
                  }}>Timed (60s)</li>
                <hr className="text-neutral-500" />
                <li className={`relative before:absolute  bullet ${mode==="passage" ? "actif" : ""}`}
                  onClick={()=>{
                     handleModeChange("passage")
                  }}>Passage</li>
              </ul>
              
            </div>
    )
}

export default Mode