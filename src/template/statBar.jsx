import {useContext,useEffect} from "react"
import {StateContext} from "./Context/stateContext.jsx"

function StatBar(){
    const {state,stateBar,setStateBar} = useContext(StateContext);
    
    useEffect(()=>{
      if(state.started && !state.ended){
        const counter = state.textarea.length;
        const correctChars = state.textarea.split("").filter((char,index)=>char===state.text[index]).length;
        const falseChars = counter - correctChars;
        const timeElapsed = 60 - stateBar.time;

        setStateBar(prev=>({...prev,
            correctChar:correctChars,
            falseChar:falseChars,
            accuracy:counter>0 ? Math.round((correctChars/counter)*100) : 100,
            wpm:state.mode==="timed" && timeElapsed>0 ? Math.round((counter/5)/(timeElapsed/60)) : 0,
            }));
      }
    },[stateBar.time])

    return (
        
          <div className="flex justify-around gap-1.5">
            <p className="flex flex-col items-center gap-1 
              md:flex-row">
              <span className="text-neutral-400">WPM:</span>
              <span className="text-3xl font-bold">{stateBar.wpm}</span>
            </p>
            <span className="border-1 border-neutral-400"></span>
            <p className="flex flex-col items-center gap-1
              md:flex-row">
              <span className="text-neutral-400">Accuracy:</span>
              <span className={`text-3xl font-bold ${state.started ? "text-green-500" : ""}`}>{stateBar.accuracy}%</span>
            </p>
            <span className="border-1 border-neutral-400"></span>
            <p className="flex flex-col items-center gap-1
              md:flex-row">
              <span className="text-neutral-400">Time:</span>
              <span className={`text-3xl font-bold ${state.started ? "text-yellow-400" : ""}`}>{stateBar.time}s</span>
            </p>
         </div>
    
    )
}

export default StatBar