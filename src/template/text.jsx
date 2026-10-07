import {useContext,useRef,useEffect} from "react"
import {StateContext} from "./Context/stateContext.jsx"
 
function Text(){
  const {state,dispatch,stateBar} = useContext(StateContext);
  const textArr = state.text.split("");

  const Caret=()=>{
    return (
      <span className="inline-block w-[2px] h-[1em] bg-white animate-pulse"></span>
    )
  }

  const reorderedText = textArr.map((char, index) => (
  <span key={index}>
    {index === state.textarea.length && <Caret />}

    <span className={state.started ? (
      index < state.textarea.length
        ? char === state.textarea[index]
          ? "text-green-500"
          : "text-red-500 underline"
        : ""
    ) : ""}>
      {char}
    </span>
  </span>
));

  const textareaRef = useRef(null);

  useEffect(()=>{
    textareaRef.current?.focus();
  },[stateBar.firstTry,state.started])
    
  const handleInput = (e)=>{
    const inputValue = e.target.value;
    dispatch({type:"start",payload:{textarea:inputValue}});
    
  }
  

    return (
        <div className="textarea-div px-3 min-h-100 relative md:px-20">
          <p className="text-neutral-400 font-bold text-3xl md:text-4xl md:px-15" >
            {reorderedText}
            {state.textarea.length === textArr.length && <Caret />}
          </p>
          <textarea 
          ref={textareaRef}
          className="text-neutral-100 absolute opacity-0 text-3xl inset-0 z-10" 
          value={state.textarea}
          onInput={handleInput}
          ></textarea>
        </div>
    )
}
export default Text 