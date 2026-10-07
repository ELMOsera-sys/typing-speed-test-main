import {StateContext} from "./Context/stateContext.jsx"
import {useContext} from "react"

function Overlay(){
  const {stateBar,setStateBar} = useContext(StateContext);

  const handleClick = ()=>{
    setStateBar(prev=>({...prev, firstTry:false}));
  }

    return (
        <div className={`textarea-not-started absolute inset-0 backdrop-blur-sm bg-black/30
          flex flex-col gap-4 items-center justify-center z-20 ${stateBar.firstTry ? "" : "hidden"}`}>
          <button className="bg-blue-600 text-neutral-100 px-4 py-2 font-bold
            text-2xl rounded-2xl
            transition-all duration-500 ease-in-out hover:scale-[1.2] active:scale-[0.9]
             " onClick={handleClick}
             > <span className="absolute inset-0"></span>
            Start Typing text
          </button>
          <p className="font-bold text-neutral-100
            text-2xl">or click the text and start typing</p>
        </div>
    )
}

export default Overlay