import {useContext} from "react"
import {StateContext} from "./Context/stateContext.jsx"
import ResetBtn from "./resetBtn.jsx"
import Icon from "./icon.jsx"


function Result(){
    const {state,stateBar} = useContext(StateContext);
    
    const resultData = {
      firstTest:{
        endingState:state.firstestTry,
        messageH:"Baseline Established !!!",
        messageP:"you ve set the bar, now the real challenge begins--Michael Jackson 'just beat it yihii'",
        messageBtn:"beat this score",
      },
      newBest:{
        endingState:state.aBestWpm,
        messageH:"High Score Chama Chama!",
        messageP:"Damn you re good! Even beating your shadow Lucky Luck's speed.",
        messageBtn:"bigger and bigger",
      },
      simpleTest:{
        endingState:true,
        messageH:"Test Complete!",
        messageP:"Solid run. Keep pushing to beat your high score.",
        messageBtn:"Try Again",
      }
    }
    

    const endingCase =
  resultData.firstTest.endingState
    ? "firstTest"
    : resultData.newBest.endingState
      ? "newBest"
      : "simpleTest";

    const result = resultData[endingCase];

    return (
        <section className=" flex flex-col items-center gap-4
              px-2.5 ">
                {endingCase !== "newBest" && <Icon name="star2" className="inline-block self-start translate-y-10" />}
          <div className="text-center  ">
              <Icon name={endingCase==="newBest" ? "personalBest" : "completed"}
              className="inline-block shadow-green-500 shadow-xl rounded-full mb-4
              md:h-20 " />
            <h2 className="text-neutral-0 text-3xl font-bold
                mb-3 mt-3">{result.messageH}</h2>
            <p className="text-neutral-500 text-xl">{result.messageP}</p>
          </div>
          <div className="flex flex-col items-left w-[80%] border-1 border-neutral-400
              p-4 rounded-2xl gap-2">
            <p className="text-neutral-400 text-xl">WPM:</p>
            <p className="text-2xl font-bold">{stateBar.wpm}</p>
          </div>
          <div className="flex flex-col items-left w-[80%] border-1 border-neutral-400
                  p-4 rounded-2xl gap-2">
            <p className="text-neutral-400 text-xl">Accuracy:</p>
            <p className="text-2xl text-red-500 font-bold">{stateBar.accuracy}</p>
          </div>
          <div className="flex flex-col items-left w-[80%] border-1 border-neutral-400
                  p-4 rounded-2xl gap-2">
            <p className="text-neutral-400 text-xl">characters:</p>
            <p className="characters-result text-2xl font-bold">
              <span className=" text-green-500">{stateBar.correctChar}</span> /
              <span className=" text-red-500">{stateBar.falseChar}</span>
            </p>
          </div>
          {endingCase !== "newBest" ? <Icon name="star1" className="inline-block self-end" /> : ""}
          <ResetBtn text={result.messageBtn} />
          {endingCase==="newBest" && <Icon name="confetti" />}
    
        </section>
    )
}

export default Result