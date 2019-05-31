'use strict';
const EMPTY = ' ';
const MINE = '💣';
const FLAG = '🚩';
const SMILE_SAD = '😞';
const SMILE_WIN = '😎';
const SMILE_NORMAL = '🙂';


var gBoard;
var gLevel = {
    SIZE: 8,
    MINES: 4
};
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    flagsCountShown: 0,
    lives: 3
};
var gMines = [];
var isGameOver;
var gTimeInterval;
var gTime = 1;

function initGame() {
    console.log('Game Started');
    gBoard = buildBoard();
    renderBoard(gBoard);
    gMines = [];
    isGameOver = false;
    gGame.isOn = false;
    gGame.markedCount = 0;
    gGame.flagsCountShown = gLevel.MINES;
    gGame.lives = 3;
    gTime = 1;
    renderNumFlags(gGame.flagsCountShown);
    document.querySelector('.smile').innerText = SMILE_NORMAL;
    document.querySelector('.lifes span').innerText = `${gGame.lives}`;
    document.querySelector('.message').innerText = '';
}

function cellClicked(i, j) {
    if (isGameOver) return;
    if (gBoard[i][j].isMarked) return;
    document.querySelector('.message').innerHTML = '';

    //first user's click
    if (!gGame.isOn) {
        gTimeInterval = setInterval(updateTime, 1000);
        putMines(i, j);
        setMinesNegsCount();
        gGame.isOn = true;
        //console.log('Number of mines:', gMines.length);

    }
    gBoard[i][j].isShown = true;

    //check if user clicked on mine
    if (gBoard[i][j].content === MINE) {

        //check for user lives
        if (gGame.lives > 0) {
            //debugger;
            gGame.lives--;
            document.querySelector('.lifes span').innerText = `${gGame.lives}`;
            document.querySelector('.message').innerHTML = `Ooops!!!<br />It's a mine<br /> Be careful<br />You lost 1 life`;
            renderCell(i, j, gBoard[i][j].content);
            document.querySelector(`.cell${i}-${j}`).classList.add('open');

            setTimeout(() => {
                renderCell(i, j, EMPTY);
                document.querySelector(`.cell${i}-${j}`).classList.remove('open');
            }, 300);
            gBoard[i][j].isShown = false;
            return;

        } else {

            renderCell(i, j, gBoard[i][j].content);
            document.querySelector(`.cell${i}-${j}`).classList.add('mine');

            for (var i = 0; i < gMines.length; i++) {
                // debugger;
                var mineI = gMines[i].i;
                var mineJ = gMines[i].j;

                renderCell(mineI, mineJ, MINE);
                document.querySelector(`.cell${mineI}-${mineJ}`).classList.add('open');
            }

            checkGameOver('mine');
            return;

        }
    }

    //if empty cell open other empty cells ** bonus method
    var minesAroundCount = gBoard[i][j].minesAroundCount;
    if (minesAroundCount === 0) {
        expandShown(i, j)
        renderCell(i, j, minesAroundCount);
    } else {
        renderCell(i, j, minesAroundCount);
    }
    //console.table(gBoard);
    checkGameOver();
}

//flag mines cells
function cellMarked(i, j) {
    event.preventDefault();

    if (isGameOver) return;
    if (gBoard[i][j].isShown) return;

    if (gBoard[i][j].isMarked) {
        gBoard[i][j].isMarked = false;
        renderCell(i, j, EMPTY)
        gGame.markedCount++;
        gGame.flagsCountShown++;
        renderNumFlags(gFlagsCount);

    } else {
        if (gGame.markedCount === gLevel.MINES) return;
        gBoard[i][j].isMarked = true;
        renderCell(i, j, FLAG)
        gGame.markedCount++;
        gGame.flagsCountShown--;
        renderNumFlags(gGame.flagsCountShown);
        console.log(gGame.markedCount);
    }

    checkGameOver();
}

//check if game if over: lost or won
function checkGameOver(content) {
    if (content === 'mine') {
        console.log('Game Over');
        isGameOver = true;
        clearInterval(gTimeInterval);
        document.querySelector('.smile').innerText = SMILE_SAD;
        document.querySelector('.message').innerText = 'Game Over';
        document.querySelector('.restart').classList.remove('none');
    } else {

        // count all revealed and flagged cells
        var victoryCount = 0;
        var isShownCount = 0;
        for (var i = 0; i < gLevel.SIZE; i++) {
            for (var j = 0; j < gLevel.SIZE; j++) {
                if (gBoard[i][j].isMarked && gBoard[i][j].content === MINE) {
                    victoryCount++;
                } else if (gBoard[i][j].isShown) {
                    isShownCount++;
                }
            }
        }

        //check if all mines are flagged and all cells are revealed
        if (victoryCount === gLevel.MINES && isShownCount === (gLevel.SIZE ** 2 - gLevel.MINES)) {
            clearInterval(gTimeInterval);
            isGameOver = true;
            document.querySelector('.smile').innerText = SMILE_WIN;
            document.querySelector('.message').innerHTML = 'Congratulations!!!<br />You won';
            document.querySelector('.restart').classList.remove('none');
            saveTime(gTime);
        }

    }
}

// reveal empty cells ** bonus method
function expandShown(i, j) {
    renderCell(i, j, gBoard[i][j].minesAroundCount);

    // this for loop goes from clicked cell to the end of the matrix
    for (var posI = i + 1; posI >= i - 1; posI--) {
        for (var posJ = j + 1; posJ >= j - 1; posJ--) {

            if (posI < 0 || posI >= gLevel.SIZE) continue;
            if (posJ < 0 || posJ >= gLevel.SIZE) continue;
            if (i === posI && j === posJ) continue;

            if (gBoard[posI][posJ].minesAroundCount > 0 && !gBoard[posI][posJ].isMarked && !gBoard.isMine) {
                gBoard[posI][posJ].isShown = true;
                renderCell(posI, posJ, gBoard[posI][posJ].minesAroundCount)
            } else if (gBoard[posI][posJ].minesAroundCount === 0 &&
                !gBoard[posI][posJ].isShown && !gBoard[posI][posJ].isMarked) {
                gBoard[posI][posJ].isShown = true;
                expandShown(posI, posJ);
            }
        }
    }
}

function setMinesNegsCount() {
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            if (gBoard[i][j].content === MINE) continue;
            gBoard[i][j].minesAroundCount = checkForNegsMines(i, j);
        }
    }
}

function checkForNegsMines(posI, posJ) {
    var count = 0;
    for (var i = posI - 1; i <= posI + 1; i++) {
        for (var j = posJ - 1; j <= posJ + 1; j++) {

            if (i === posI && j === posJ) continue;
            if (i < 0 || i >= gLevel.SIZE) continue;
            if (j < 0 || j >= gLevel.SIZE) continue;

            var cell = gBoard[i][j].content;
            if (cell === MINE) count++;
        }
    }
    return count;
}

function putMines(posI, posJ) {
    while (gMines.length < gLevel.MINES) {

        var i = Math.floor(Math.random() * gLevel.SIZE);
        var j = Math.floor(Math.random() * gLevel.SIZE);

        if (posI === i && posJ === j) continue;
        if (gBoard[i][j].isMine) continue;

        gBoard[i][j].content = MINE;
        gBoard[i][j].isMine = true;
        gMines.push({
            i: i,
            j: j
        });
    }
}

function buildBoard() {
    var board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
                content: EMPTY,
            };
        }
    }
    return board;
}

function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            strHtml += `<td class="cell${i}-${j}" onclick="cellClicked(${i},${j})" oncontextmenu="cellMarked(${i},${j})"></td>`;
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector('.game-board');
    elMat.innerHTML = `<tbody>${strHtml}</tbody>`;
}

function setLevel(num) {
    if (num === 4) {
        gLevel.SIZE = 4;
        gLevel.MINES = 2;
        gGame.flagsCountShown = 2;
    } else if (num === 8) {
        gLevel.SIZE = 8;
        gLevel.MINES = 10;
        gGame.flagsCountShown = 4;
    } else if (num === 12) {
        gLevel.SIZE = 12;
        gLevel.MINES = 15;
        gGame.flagsCountShown = 8;
    }
    document.querySelector('.time span').innerText = '';
    clearInterval(gTimeInterval);
    initGame();
}

function renderCell(i, j, content) {
    var cellSel = `.cell${i}-${j}`;
    var elCell = document.querySelector(cellSel);

    if (content === 1) document.querySelector(cellSel).classList.add('blue', 'open');
    if (content === 2) document.querySelector(cellSel).classList.add('green', 'open');
    if (content >= 3) document.querySelector(cellSel).classList.add('red', 'open');
    if (content === 0) {
        content = '';
        document.querySelector(cellSel).classList.add('open');
    }

    elCell.innerText = content;
}

function updateTime() {
    document.querySelector('.time span').innerText = `${gTime++}`;
}

function renderNumFlags(content) {
    document.querySelector('.flags span').innerText = `${content}`;
}

function restart() {
    clearInterval(gTimeInterval);
    initGame();
    document.querySelector('.restart').classList.add('none');
    document.querySelector('.time span').innerText = '';
}

function saveTime(lastTime) {
    if (gLevel.SIZE === 4) {
        if (localStorage.bestTimeBeginner === undefined ||
            lastTime < localStorage.bestTimeBeginner) localStorage.setItem('bestTimeBeginner', lastTime);
    } else if (gLevel.SIZE === 8) {
        if (localStorage.bestTimeMedium === undefined ||
            lastTime < localStorage.bestTimeMedium) localStorage.setItem('bestTimeMedium', lastTime);
    } else if (gLevel.SIZE === 12) {
        if (localStorage.bestTimeExpert === undefined ||
            lastTime < localStorage.bestTimeExpert) localStorage.setItem('bestTimeExpert', lastTime);
    }
}

//TODO: Show to user best time - rendering
function showBestTimeToUser() {

}