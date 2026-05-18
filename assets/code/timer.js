import {dom} from './dom.js';
import {state} from './state.js';
import {render,resetRender} from './ui.js';
import {isEndingTyping} from '../../app.js';


export function isStartingTimer(){
    if(state.interval!==null){return;}
    dom.timer.classList.add('text-yellow-400');
    state.interval=setInterval(()=>{
        state.time--;
        render();
        if(state.time===0){
            isEndingTimer();
            isEndingTyping();
        }
    },1000);
}
export function isEndingTimer(){
    if(state.interval!==null){
        clearInterval(state.interval);
        dom.timer.classList.remove('text-yellow-400');
        state.interval=null;
    }
    
}