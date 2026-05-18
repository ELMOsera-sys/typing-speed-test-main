import {dom} from './assets/code/dom.js';
import {state} from './assets/code/state.js';
import {render,renderText,resetRender,showResult} from './assets/code/ui.js';
import {randomTextHandler,typingHandler,resetTypingHandler,wpmHandler,accuracyHandler} from './assets/code/typing.js';
import {isStartingTimer,isEndingTimer} from './assets/code/timer.js';



export function isEndingTyping(){
    wpmHandler();
    isEndingTimer();
     showResult();
                    
                        dom.templateResetBtn.addEventListener("click",()=>{
                            dom.main.lastElementChild.remove();
                            resetRender(); 
                            renderText();
                            resetTypingHandler(); 
                             
                        },{once:true});
}


function typingSpeedTest(dataFetch){
    state.easy=dataFetch.easy;
    state.medium=dataFetch.medium;
    state.hard=dataFetch.hard;

    randomTextHandler();
    render();
    renderText();
    dom.textareaNotStarted.classList.remove("hidden");

    dom.difficultyOption.addEventListener('click',()=>{
    dom.difficultyOption.classList.toggle("after:rotate-180");
    dom.difficultyLvlUl.classList.toggle('hidden');
       
    })

    dom.difficultyLvlUl.querySelectorAll('li').forEach((li)=>{
        li.addEventListener('click',()=>{
            dom.difficultyLvlUl.querySelectorAll('li').forEach((li)=>{
                li.classList.remove('actif');
            })

            state.difficulty=li.dataset.difficulty;
            dom.difficultyOption.dataset.difficulty=li.dataset.difficulty;
            dom.difficultyOption.textContent=li.dataset.difficulty;

            randomTextHandler();
            li.classList.add('actif');
            isEndingTimer();
            resetRender();
            renderText();
            resetTypingHandler();
            setTimeout(() => {
                dom.difficultyLvlUl.classList.add('hidden');
            }, 1000);
        })
    })

    dom.modeOption.addEventListener('click',()=>{
    dom.modeOption.classList.toggle("after:rotate-180");
    dom.modeLvlUl.classList.toggle('hidden');

    })

    dom.modeLvlUl.querySelectorAll('li').forEach((li)=>{
        li.addEventListener('click',()=>{
            dom.modeLvlUl.querySelectorAll('li').forEach((li)=>{
                li.classList.remove('actif');
            });

            dom.modeOption.textContent=li.dataset.mode;
            dom.modeOption.dataset.mode=li.dataset.mode;
            state.mode=li.dataset.mode;

            li.classList.add('actif');
            isEndingTimer();
            resetRender();
            renderText();
            resetTypingHandler();

            setTimeout(() => {
                dom.modeLvlUl.classList.add('hidden');
            }, 1000);
        })
    })

    dom.notStartedBtn.addEventListener("click",()=>{
        dom.textareaNotStarted.classList.add("hidden");
        state.notStarted=true;
    })

    dom.textareaCapturer.addEventListener("input",()=>{
        typingHandler();
        if(state.notStarted){
            state.notStarted=false;
            if(state.mode==="timed"){
                isStartingTimer();
            }  
        }

        if(state.typingEnd){
            isEndingTyping();
                
            }
            dom.templateResetBtn=null;
    })

    dom.resetBtn.addEventListener("click",()=>{
        isEndingTimer();
        resetRender();
        renderText();
        resetTypingHandler();
    })
}

async function fetchData(){
    try{
        const response = await fetch('./data.json');
        const data = await response.json();
        typingSpeedTest(data)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
fetchData();