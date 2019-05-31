'use strict';
var gBoardSize;
var gNums;
var gColledNum;
var gTimer;
var isTimerRun = false;
var interval;

function init() {
    gBoardSize = 4;
    gNums = getGnums();
    printBoard()
    gColledNum = getNum();
    document.querySelector('.number span').innerText = gColledNum;
    document.querySelector('.new-game-btn').disabled = true;

    interval = setInterval(getTimer, 5);
}


function cellClicked(clickedNum, elBtn) {

    if (gColledNum === clickedNum) {
        elBtn.classList.add('red');
        gColledNum = getNum();
        document.querySelector('.number span').innerText = gColledNum;

        if (clickedNum === 1) {
            gTimer = 0.000;
            isTimerRun = true;
            document.querySelector('.time span').innerText = gTimer;
            document.querySelector('.new-game-btn').disabled = false;

        }

        if (gBoardSize ** 2 === clickedNum) {
            clearInterval(interval);
            document.querySelector('.number span').innerText = clickedNum;
            //document.querySelector('.new-game-btn').disabled = true;
            isTimerRun = false;
        }
    }
}

function newGame() {
    clearInterval(interval);
    gNums = getGnums();
    printBoard();
    gColledNum = getNum();
    document.querySelector('.number span').innerText = gColledNum;
    document.querySelector('.new-game-btn').disabled = true;
    document.querySelector('.time span').innerText = '';
    isTimerRun = false;
    setInterval(getTimer, 5);

}

function getTimer() {
    if (isTimerRun) {
        gTimer += 0.005;
        document.querySelector('.time span').innerText = gTimer.toFixed(3);
    }
}

function isCheked(elRadio) {
    if (!isTimerRun) {
        gBoardSize = +elRadio;
        gNums = getGnums();
        printBoard();
        gColledNum = getNum();
        document.querySelector('.number span').innerText = gColledNum;
        document.querySelector('.time span').innerText = '';

    }
}

function printBoard() {
    var nums = gNums.slice();
    var strHTML = '';
    shuffleNums(nums);

    for (var i = 0; i < gBoardSize; i++) {
        var strTDs = '';
        for (var j = 0; j < gBoardSize; j++) {
            var num = nums.pop();
            strTDs += `<td><button class = "button" onClick = "cellClicked(${num}, this)">${num}</button></td>`;
        }
        strHTML += `<tr>${strTDs}</tr>`;
    }
    document.querySelector('.game-board').innerHTML = `<table><tbody>${strHTML}</tbody></table>`;
}

function getNum() {
    return gNums.shift();
}

function getGnums() {
    var nums = [];
    var count = 0;
    for (var i = 0; i < gBoardSize ** 2; i++) {
        nums[i] = ++count;
    }
    return nums;
}

function shuffleNums(gNums) {
    gNums.sort(() => Math.random() - 0.5);
}