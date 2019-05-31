'use strict';

var gTrans = {
    'page-title':{
        en: 'Online Books Shop',
        he: 'חנות ספרים'
    },
    h1: {
        en: 'Book Shop',
        he: 'חנות ספרים'
    },
    cover: {
        en: 'Cover',
        he: 'כריכה'
    },
    title: {
        en: 'Title',
        he: 'שם הספר'
    },
    price: {
        en: 'Price',
        he: 'מחיר'
    },
    actions: {
        en: 'Actions',
        he: 'פעולות'
    },
    'read-btn': {
        en: 'Read',
        he: 'פרטים'
    },
    'update-btn': {
        en: 'Update',
        he: 'עדכון'
    },
    'delete-btn': {
        en: 'Delete',
        he: 'מחק'
    },
    close: {
        en: 'Close',
        he: 'סגור'
    },
    create: {
        en: 'Create new book',
        he: 'הוסף ספר חדש'
    },
    'add-book-btn': {
        en: 'Add new book',
        he: 'הוסף'
    },
    'input-book-name': {
        en: 'Book\'s name',
        he: 'שם הספר:'
    },
    'input-book-price': {
        en: 'Book\'s price',
        he: 'מחיר הספר:'
    },
    'change-price-btn': {
        en: 'Update',
        he: 'עדכן'
    },
    'input-change-book-price': {
        en: 'New price',
        he: 'המחיר החדש'
    }
}

var gCurrLang = 'en';

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');
    for (var i = 0; i < els.length; i++) {
        var el = els[i];
        var transKey = el.dataset.trans;
        var txt = getTrans(transKey);

        el.innerHTML = txt;
        

        if(el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', txt)
        }
    }

}

function getTrans(transKey) {
    var key = gTrans[transKey]
    if(!key) return 'unknown';

    if(!txt) txt = key['en']; 

    var txt = key[gCurrLang];
    return txt;
}

function setLang(lang) {
    gCurrLang = lang;
}

function setCurrancy(lang, price) {
    if (lang === 'he') {
        var hePrice = price * 3.5
        return hePrice.toFixed(2);
    } else {
        return price;
    }
}