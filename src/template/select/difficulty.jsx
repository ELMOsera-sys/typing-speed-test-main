import {useState,useContext,useEffect} from "react"
import Icon from "../icon.jsx"
import {StateContext} from "../Context/stateContext.jsx"
import {DataContext} from "../Context/dataContext.jsx"


function Difficulty(){
    const [active, setActive] = useState(false);
    const {state,dispatch,setStateBar} = useContext(StateContext);
    const {data,loading,error} = useContext(DataContext);

    const [difficultyLevel,setDifficultyLevel] = useState(state.difficulty || "hard");

    useEffect(() => {
    if (loading || error || !data?.[state.difficulty]) return;
    dispatch({type: "difficulty", payload: {difficulty: state.difficulty, 
      text: data[state.difficulty][Math.floor(Math.random() * data[state.difficulty].length)].text}});
}, [loading, error, data]);


    const handleDifficultyChange = (level) => {
        setDifficultyLevel(level);
        setStateBar(prev=>({...prev, 
          firstTry:true,
          time:60,
          wpm:0,
          accuracy:100
        }));
        const randomText = data[level][Math.floor(Math.random()*data[level].length)].text;
        dispatch({type:"difficulty",payload:{
            difficulty: level,
            text: randomText
        }});
        dispatch({type:"reset"});
    }


    return (
        <div className="difficulty-lvl relative md:flex md:flex-row md:static md:items-center"
        onClick={() => setActive(!active)}>
              <p className=" mb-3 w-[10rem] text-center 
                px-2 border-2 border-neutral-500 rounded-sm p-1 
                cursor-pointer
                hover:animate-pulse active:animate-bounce md:hidden" 
              >{difficultyLevel === "easy" ? "Easy" : difficultyLevel === "medium" ? "Medium" : "Hard"}
                <Icon
                name="downArrow"
                className={`ml-2 inline-block transition-transform ${active ? "rotate-180" : ""}`}
               />
              </p>
              <p className="hidden cursor-pointer md:block">difficulty:</p>
              <ul className={`text-center cursor-pointer absolute z-40 left-5 cursor-pointer md:static
                bg-neutral-800 p-1 w-[8rem] flex flex-col gap-1.5 md:block md:w-auto md:static md:bg-neutral-900
                animate__animated md:flex  md:flex-row ` + (!active ? " hidden" : "")}>
                <li className={`relative before:absolute  bullet ${difficultyLevel==="easy" ? "actif" : ""}`}
                  
                  onClick={()=>{
                     handleDifficultyChange("easy")
                  }}
                  >Easy</li>
                <hr className="text-neutral-500" />
                <li className={`relative before:absolute  bullet ${difficultyLevel==="medium" ? "actif" : ""}`}
                 
                  onClick={()=>{
                     handleDifficultyChange("medium")
                  }}
                  >Medium</li>
                <hr className="text-neutral-500" />
                <li className={`relative before:absolute  bullet ${difficultyLevel==="hard" ? "actif" : ""}`}
                  onClick={()=>{
                     handleDifficultyChange("hard")
                  }}
                  >Hard</li>
              </ul>
            </div>
    )
}

export default Difficulty