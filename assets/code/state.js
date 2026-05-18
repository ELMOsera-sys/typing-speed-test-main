export const state={
        difficulty:"easy",
        mode:"timed",
        
        accuracy:100,
        wpm:0,
        time:60,
        bestWpm:0,

        newBest:false,

        interval:null,
        resultNode:null,

        typingEnd:false,
        typingCounter:0,
        correctChar:0,
        falseChar:0,

        notStarted:false,
        currentText:"",
        firstTry:true,

        easy:null,
        medium:null,
        hard:null,
};