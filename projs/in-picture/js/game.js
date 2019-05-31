'use strict';
var isGameRun = true;
var gCurrQuestIdx = 0;
var gQuests = [{
    id: 1,
    opts: ['The rat is in cap?', 'The cat is in cap?'],
    correctOptIndex: 0,
    img: 'img/1.png'
}, {
    id: 2,
    opts: ['The rat is on pan?', 'The rat is on cat?'],
    correctOptIndex: 1,
    img: 'img/2.png'
}, {
    id: 3,
    opts: ['He is a bat?', 'He is a van?'],
    correctOptIndex: 0,
    img: 'img/3.png'
}];


function initGame() {
    renderQuest();
}

function checkAnswer(optIdx) {
    var question = gQuests[gCurrQuestIdx];
    if (optIdx === question.correctOptIndex) {
        gCurrQuestIdx++;

        if (gCurrQuestIdx === gQuests.length) {
            document.querySelector('.dashboard').classList.add('none');
            document.querySelector('.questions').classList.add('none');
            document.querySelector('.game').innerHTML = '<h1>Game Over <br />You won!!!</h1>';
            isGameRun = false;
        }
        renderQuest();
    }

}

function renderQuest() {
    var strHTML = '';
    var quest = gQuests[gCurrQuestIdx];

    if (isGameRun) {
        for (var i = 0; i < quest.opts.length; i++) {
            strHTML += `<button onClick="checkAnswer(${i})">${quest.opts[i]}</button>`;
        }
        document.querySelector('.picture').innerHTML = `<img src="${quest.img}">`
        document.querySelector('.questions').innerHTML = strHTML;
    }
}