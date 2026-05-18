import { state } from "./state.js";
import {dom} from "./dom.js";


export function render(){
    dom.resultWbm.textContent=`${state.wpm}`;
    dom.resultAccuracy.textContent=`${state.accuracy}%`;
    dom.bestWbm.textContent=`${state.bestWpm}`;

    dom.timer.textContent=`${state.time}s`;
}
export function renderText(){
    dom.textareaRenderer.innerHTML = state.currentText
       .split("")
       .map(char => `<span>${char}</span>`)
       .join("");
}

export function resetRender(){
    state.wpm=0;
    state.accuracy=100;
    state.time=60;
    dom.resultWbm.textContent=`${state.wpm}`;
    dom.resultAccuracy.textContent=`${state.accuracy}%`;
    dom.timer.textContent=`${state.time}s`;
    dom.resultAccuracy.classList.remove("text-red-500");
    dom.textareaCapturer.value="";
    dom.textareaNotStarted.classList.remove("hidden");
    if(dom.menuSection.classList.contains('hidden') && dom.testSection.classList.contains('hidden')){
        dom.menuSection.classList.remove('hidden');
        dom.testSection.classList.remove('hidden');
    }
    

}



export function showResult(){
    const clone = dom.template.content.cloneNode(true);
    
    clone.querySelector('.wbp-result').textContent = state.wpm;
    clone.querySelector('.accuracy-result').textContent = state.accuracy + "%";
    clone.querySelector('.correct-char').textContent = state.correctChar;
    clone.querySelector('.uncorrect-char').textContent = state.falseChar;

    if(state.firstTry){
        clone.querySelector("h2").textContent="Baseline Established:";
        clone.querySelector(".text-div p").textContent="you ve set the bar.Now the real challenge begins---kamehameyahhhh it";
        clone.querySelector("button").textContent="Let's beat this score";
        state.firstTry=false;
        state.bestWpm=state.wpm;
    }else if(!state.firstTry && state.wpm>state.bestWpm){
        state.newBest=true;
        state.bestWpm=state.wpm;
        clone.querySelector("h2").textContent="High Score Smashed!";
        clone.querySelector(".text-div p").textContent="You re getting faster and faster! Keep up the great work!";
        clone.querySelector("button").textContent="bigger and bigger";
        clone.querySelector("section").classList.add("bg-[url('./assets/images/pattern-confetti.svg')]");
        clone.querySelector(".text-div").classList.remove("before:content-[url('./assets/images/icon-completed.svg')]");
        clone.querySelector(".text-div").classList.add("before:content-[url('./assets/images/icon-new-pb.svg')]");
    }
    dom.menuSection.classList.add('hidden');
    dom.testSection.classList.add('hidden');

    dom.bestWbm.textContent=`${state.bestWpm}`;

    state.resultNode = clone;
    const resetBtn = clone.querySelector('.reset-btn');
    dom.main.appendChild(clone);

    dom.templateResetBtn=resetBtn;

}

