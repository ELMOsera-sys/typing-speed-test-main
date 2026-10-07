import {dom} from './dom.js';
import {state} from './state.js';
import {render,renderText,resetRender} from './ui.js';
import { isEndingTimer } from './timer.js';
export function randomTextHandler(){
    if(state.difficulty==="easy"){
       state.currentText =state.easy[Math.floor(Math.random()*state.easy.length)].text;
    }else if(state.difficulty==="medium"){
        state.currentText=state.medium[Math.floor(Math.random()*state.medium.length)].text;
    }else if(state.difficulty==="hard"){
        state.currentText=state.hard[Math.floor(Math.random()*state.hard.length)].text;
    }
}

 export function accuracyHandler(){
        if(state.typingCounter>0){
            state.accuracy = Math.round((state.correctChar / state.typingCounter) * 100);
            dom.resultAccuracy.classList.add("text-red-500");
        }
    }

   export function wpmHandler(){
    const timeElapsed = 60 - state.time;
        if(state.typingCounter>0){
            if(timeElapsed <= 0) return;
            state.wpm = Math.round((state.typingCounter / 5) / (timeElapsed / 60));
        }
    }

export function typingHandler(){
    const value=dom.textareaCapturer.value;
        const spans=dom.textareaRenderer.querySelectorAll('span');
            
            value.split("").forEach((char,index)=>{    
                spans[index]?.classList.remove("text-green-500","text-red-500");

                if(char===spans[index].textContent){  
                    spans[index].classList.add("text-green-500");
                }else if(char!==spans[index].textContent){
                    spans[index].classList.add("text-red-500");
                }
            })
           state.correctChar = value.split("").filter((char, i) => char === spans[i]?.textContent).length;
           state.falseChar = value.length - state.correctChar;
           state.typingCounter = value.length;

           if(state.typingCounter===state.currentText.length){
            state.typingEnd=true;
           }

              accuracyHandler();
                wpmHandler();
    }

export function resetTypingHandler(){
    const value=dom.textareaCapturer.value;
    const spans=dom.textareaRenderer.querySelectorAll('span');
            
        value.split("").forEach((char,index)=>{
                    if(spans[index].classList.contains("text-green-500")){
                        spans[index].classList.remove("text-green-500");
                    }else if(spans[index].classList.contains("text-red-500")){
                    spans[index].classList.remove("text-red-500");
                    }
                
         })
         if(dom.resultAccuracy.classList.contains("text-red-500")){
            dom.resultAccuracy.classList.remove("text-red-500");
         }else if(dom.resultWbm.classList.contains("text-red-500")){
            dom.resultWbm.classList.remove("text-red-500");
            }
        
           state.correctChar = 0;
           state.falseChar = 0;
           state.typingCounter = 0;
           state.typingEnd=false;

           dom.textareaNotStarted.classList.remove("hidden");
           dom.textareaCapturer.value="";
}    

