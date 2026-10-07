import Icon from "./icon.jsx";
import {useContext} from "react"
import {StateContext} from "./Context/stateContext.jsx"

function ResetBtn({text}){
    const {dispatch,setStateBar} = useContext(StateContext);

    const handleReset = () => {
        dispatch({type: "reset"});
        setStateBar(prev=>({...prev, 
          time:60,
          wpm:0,
          accuracy:100
        }));
    };

    return (
        <button className="bg-neutral-600 text-neutral-100 px-4 py-2 font-bold
            text-2xl rounded-2xl flex items-center justify-center gap-2 
            transition-all duration-500 ease-in-out hover:scale-[1.2] active:scale-[0.9]
            w-[50%] md:w-[20%] mx-auto mt-3 md:mt-0"
             
            onClick={handleReset}>
                {text}
            <Icon name="restart" className="ml-3" />
        </button>
    )
}

export default ResetBtn