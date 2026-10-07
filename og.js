let interval;


let dataFetch;




function init(data){
    dataFetch=data;
    state={
        difficulty:"easy",
        accuracy:100,
        wpm:0,
        time:60,
        mode:"timed",
        bestWpm:state.bestWpm,
        notStarted:false,
        currentText:"",
        firstTry:true,

        easy:dataFetch.easy,
        medium:dataFetch.medium,
        hard:dataFetch.hard,

    };

    typingCounter=0;
    correctTypingCounter=0;
    falseTypingCounter=0;

    bestWbm.textContent=state.bestWpm+"WPM";
    resultWbm.textContent=state.bestWpm;
    resultAccuracy.textContent=state.accuracy+"%";
    timer.textContent=state.time+"s";

    currentText=state.easy[0].text;
    textareaRenderer.innerHTML = currentText.split("").map(char => `<span>${char}</span>`).join("");
    textareaNotStarted.classList.remove("hidden");
    state.notStarted=true;

   
}
notStartedBtn.addEventListener("click",()=>{
    textareaNotStarted.classList.add("hidden");
    state.notStarted=false;
})


function showResult(){
    
    clone.querySelector('.wbp-result').textContent = state.wpm;
    clone.querySelector('.accuracy-result').textContent = state.accuracy + "%";
    clone.querySelector('.correct-char').textContent = correctTypingCounter;
    clone.querySelector('.uncorrect-char').textContent = falseTypingCounter;

    if(state.firstTry){
        clone.querySelector("h2").textContent="Baseline Established:";
        clone.querySelector(".text-div p").textContent="you ve set the bar.Now the real challenge begins---kamehameyahhhh it";
        clone.querySelector("button").textContent="Let's beat this score";
        state.firstTry=false;
    }else if(!state.firstTry && state.wpm>state.bestWpm){
        clone.querySelector("h2").textContent="Baseline Established:";
        clone.querySelector(".text-div p").textContent="you ve set the bar.Now the real challenge begins---kamehameyahhhh it";
        clone.querySelector("button").textContent="Let's beat this score";
        clone.querySelector("section").classList.add("bg-[url('./assets/images/pattern-confetti.svg')]");
        clone.querySelector("text-div").classList.remove("before:content-[url('./assets/images/icon-completed.svg')]");
        clone.querySelector("text-div").classList.add("before:content-[url('./assets/images/icon-new-record.svg')]");
    }
    menuSection.classList.add('hidden');
    testSection.classList.add('hidden');

    templateResetBtn = clone.querySelector('.reset-btn');
    document.querySelector('main').appendChild(clone);
    templateResetBtn.addEventListener('click',resetHandler);
}

function resetHandler(){
    menuSection.classList.remove('hidden');
    testSection.classList.remove('hidden');
    state.time=60;
    state.wpm=0;
    state.accuracy=100;

    typingCounter=0;
    correctTypingCounter=0;
    falseTypingCounter=0;

    bestWbm.textContent=state.bestWpm+"WPM";
    resultWbm.textContent=state.bestWpm;
    resultAccuracy.textContent=state.accuracy+"%";
    timer.textContent=state.time+"s";

    currentText=state.easy[0].text;
    textareaRenderer.innerHTML = currentText.split("").map(char => `<span>${char}</span>`).join("");
    textareaNotStarted.classList.remove("hidden");
    state.notStarted=true;

    document.querySelector('main last-child').remove();
    clearInterval(interval);
        
}
resetBtn.addEventListener('click',resetHandler);


textareaCapturer.addEventListener('input',(e)=>{
        const value=e.target.value;
        const spans=textareaRenderer.querySelectorAll('span');

        if(!state.notStarted){
            if(state.mode==="timed" && typingCounter===0){
                timeHandler();           
            }
            
            value.split("").forEach((char,index)=>{
                if(char===spans[index].textContent){
                    spans[index].classList.add("text-green-500");
                }else if(char!==spans[index].textContent){
                    spans[index].classList.add("text-red-500");
                }
            })
           correctTypingCounter = value.split("").filter((char, i) => char === spans[i]?.textContent).length;
           falseTypingCounter = value.length - correctTypingCounter;
           typingCounter = value.length;
        }
        accuracyHandler();
        wpmHandler();
        bestWpmHandler();
    }
    )


    function accuracyHandler(){
        if(typingCounter>0){
            state.accuracy = Math.round((correctTypingCounter / typingCounter) * 100);
            resultAccuracy.textContent = state.accuracy + "%";
            resultAccuracy.classList.add("text-red-500");
            setTimeout(() => {
                resultAccuracy.classList.remove("text-red-500");
            }, 2000);
        }
    }

    function wpmHandler(){
        if(typingCounter>0){
            state.wpm = Math.round(correctTypingCounter / 5);
            resultWbm.textContent = state.wpm;
        }
    }

    function bestWpmHandler(){
        if(state.wpm>state.bestWpm){
            state.bestWpm=state.wpm;
            bestWbm.textContent=state.bestWpm+"WPM";
        }
    }

function randomTextHandler(){
    if(state.difficulty==="easy"){
       state.currentText =state.easy[Math.floor(Math.random()*state.easy.length)].text;
    }else if(state.difficulty==="medium"){
        state.currentText=state.medium[Math.floor(Math.random()*state.medium.length)].text;
    }else if(state.difficulty==="hard"){
        state.currentText=state.hard[Math.floor(Math.random()*state.hard.length)].text;
    }
    textareaRenderer.innerHTML = state.currentText.split("").map(char => `<span>${char}</span>`).join("");
}


function timeHandler(){
    state.time=60;
    let time=state.time;
    timer.classList.add('text-yellow-400');
    interval=setInterval(()=>{
        time--;
        state.time=time;
        timer.textContent=time+"s";
        if(time===0){
            clearInterval(interval);
            timer.classList.remove('text-yellow-400');
            showResult();
        }
    },1000);
}

const difficultyOption=document.querySelector('.difficulty-option');
const difficultyLvlUl=document.querySelector('.difficulty-lvl ul');

state.difficulty=difficultyOption.dataset.difficulty;

difficultyOption.addEventListener('click',()=>{
    difficultyOption.classList.toggle("after:rotate-180");
    difficultyLvlUl.classList.toggle('hidden');
       
})
difficultyLvlUl.querySelectorAll('li').forEach((li)=>{
        li.addEventListener('click',()=>{
            difficultyLvlUl.querySelectorAll('li').forEach((li)=>{
                li.classList.remove('actif');
            })

            difficultyOption.textContent=li.textContent.trim();
            state.difficulty=li.dataset.difficulty;
            difficultyOption.dataset.difficulty=li.dataset.difficulty;
            randomTextHandler();
            li.classList.add('actif');
            clearInterval(interval);

            setTimeout(() => {
                difficultyLvlUl.classList.add('hidden');
            }, 1000);
        })
    })


const modeOption=document.querySelector('.mode-option');
const modeLvlUl=document.querySelector('.mode-lvl ul');

state.mode=modeOption.dataset.mode;

modeOption.addEventListener('click',()=>{
    modeOption.classList.toggle("after:rotate-180");
    modeLvlUl.classList.toggle('hidden');

})
modeLvlUl.querySelectorAll('li').forEach((li)=>{
        li.addEventListener('click',()=>{
            modeLvlUl.querySelectorAll('li').forEach((li)=>{
                li.classList.remove('actif');
            });

            modeOption.textContent=li.textContent.trim();
            modeOption.dataset.mode=li.dataset.mode;
            state.mode=li.dataset.mode;
            clearInterval(interval);
            li.classList.add('actif');

            setTimeout(() => {
                modeLvlUl.classList.add('hidden');
            }, 1000);
        })
    })

async function fetchData() {
    try{
        const response = await fetch('data.json');
        const data = await response.json();
        dataFetch=data;
        init(data);
    }
catch(error){
    console.log("y a une erreur",error);
}}

fetchData();