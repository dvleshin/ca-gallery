'use strict';

var gProjs;

function createProjects() {
    var projs = [{
        id: 'bookshop',
        name: 'Book Shop',
        title: 'Book Shop',
        decs: 'Cool book shop template that works dinamicaly on Jquery + pure JS',
        url: 'projs/book-shop',
        publishedAt: Date.now(),
        labels: ['jquery', 'click events', 'JavaSctrip', 'Dinamic render']
    }, {
        id: 'minesweeper',
        name: 'Minesweeper Game',
        title: 'Minesweeper',
        decs: 'Minesweeper game was created on pure JavaScrip with recursive method',
        url: 'projs/minesweeper-game',
        publishedAt: Date.now(),
        labels: ['pure javascript', 'recursive', 'click events', 'javascript']
    }, {
        id: 'touchnums',
        name: 'Touch Nums',
        title: 'Touch Nums',
        decs: 'Funny and interesting game was created on pure JavaScrip with colorful design',
        url: 'projs/touch-nums',
        publishedAt: Date.now(),
        labels: ['pure javascript', 'click events', 'javascript']
    }, {
        id: 'inpicture',
        name: 'In Picture',
        title: 'In Picture',
        decs: 'Funny and interesting game was created on pure JavaScrip with colorful design',
        url: 'projs/in-picture',
        publishedAt: Date.now(),
        labels: ['pure javascript', 'click events', 'javascript']
    }]
    gProjs = projs;
}

function getProj(projId) {
    return gProjs.find(function (proj) {
        return proj.id === projId;
    })
}
function getgProjs(){
    return gProjs;
}


function convertTimestampToHumanDate(timestamp) {
    var humanDate = new Date(timestamp);

    var d = humanDate.getDate();
    var m = humanDate.getMonth() + 1;
    var y = humanDate.getFullYear();

    return `${padNum(d)}/${padNum(m)}/${y}`;
}

function padNum(num) {
    return (num >= 10) ? '' + num : '0' + num;
}