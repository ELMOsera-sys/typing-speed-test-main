import {useReducer,useState,useEffect,createContext} from "react" ;

export const StateContext=createContext();

const initialState={
        difficulty:"hard",
        mode:"timed",
        
        bestWpm:Number(localStorage.getItem("bestWpm")) || 0,

        started:false,
        ended:false,

        firstestTry:true,
        aBestWpm:false,
        
        text:"",
        textarea:"",
};

const reducer=(state,action)=>{
    
    switch(action.type){
        case "difficulty":
            return {...state,
                difficulty:action.payload.difficulty,
                text:action.payload.text,
            };
        case "mode":
            return {...state,
                mode:action.payload.mode,
            };
        case "start":
            return {...state,
                started:true,
                textarea:action.payload.textarea,
            };
        case "reset":
            return {...state,
                started:false,
                ended:false,
                textarea:"",
                firstestTry: state.ended ? false : state.firstestTry,
            };
        case "ended":
            return{...state,
                ended:true,
                started:false,
                bestWpm:action.payload.bestWpm,
                aBestWpm:action.payload.aBestWpm
            }  

        default:
            return state;
        
    }
        
}

export function StateProvider({children}){
    const [state,dispatch]=useReducer(reducer,initialState);
    const [stateBar,setStateBar]=useState({
        correctChar:0,
        falseChar:0,
        wpm:0,
        accuracy:100,
        time:  60,
        firstTry:true,
    })

    

    useEffect(()=>{
        if (!state.started) return;
        if (
  (state.mode === "timed" && stateBar.time <= 0) ||
  (state.textarea.length >= state.text.length && state.textarea.length>1)
) {
    const aBestWpm = state.bestWpm < stateBar.wpm;
    if (aBestWpm) {
  localStorage.setItem("bestWpm", stateBar.wpm);
}
   dispatch({type:"ended",payload:{bestWpm:aBestWpm ? stateBar.wpm : state.bestWpm,aBestWpm:aBestWpm}});
}  },[stateBar.time,state.textarea])

    return(
        <StateContext.Provider value={{state,dispatch,stateBar,setStateBar}}>
            {children}
        </StateContext.Provider>
    )
}