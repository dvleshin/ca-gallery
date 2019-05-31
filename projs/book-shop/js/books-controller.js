'use strict';
var gBookId;

$('document').ready(function () {
    console.log('Ready');
    createBooks();
    renderBooks()
})


function renderBooks() {
    var books = gBooks;
    var bookLangTitle;
    var bookLangPrice;
    var strHTML = books.map(function (book) {

        if (gCurrLang === 'he') {
            bookLangTitle = book.titleHe;
            bookLangPrice = '₪' + setCurrancy(gCurrLang, book.price)
        } else {
            bookLangTitle = book.title;
            bookLangPrice = '$' + book.price;
        }

        return `
        <tr>
            <th scope="row">${book.bookId}</th>
            <td><img src="${book.imgUrl}" class="img-thumbnail"></td>
            <td>${bookLangTitle}</td>
            <td>${bookLangPrice}</td>
            <td>
                <button type="button" onclick="onReadBookModal(${book.bookId})" data-toggle="modal" data-target="#bookModal" class="btn btn-primary" data-trans="read-btn">Read</button>
                <a class="btn btn-warning" data-toggle="collapse" href="#book${book.bookId}" role="button" aria-expanded="false" aria-controls="collapseForm" data-trans="update-btn">Update</a>
                <button type="button" onclick="onDeleteBook(${book.bookId})" class="btn btn-danger" data-trans="delete-btn">Delete</button>
            
                <div class="collapse update-price" id="book${book.bookId}">
                    <input type="text" class="form-control" id="changeBookPrice${book.bookId}" data-trans="input-change-book-price" placeholder="New price">
                    <button class="btn btn-primary" onclick="readAndUpdateBook(${book.bookId})" type="button" data-trans="change-price-btn">Update</button>
                </div>
            </td>
        </tr>
        `
    })
    $('tbody').html(strHTML.join(''))
}

function onDeleteBook(id) {
    deleteBook(id);
    renderBooks();
}

function readAndAddNewBook() {
    var bookName = $('#inputBookName').val();
    var bookPrice = $('#inputBookPrice').val();


    if (bookName === '' || bookPrice === '') {
        alert('Please, enter a book name or a book price');
    } else {
        addBook(bookName, bookPrice);
        renderBooks();
        $('.collapse').collapse('hide');
        $('#inputBookName').val('');
        $('#inputBookPrice').val('');
    }
}

function readAndUpdateBook(bookId) {
    var bookPrice = $('#changeBookPrice' + bookId).val();

    updateBookPrice(bookId, bookPrice);
    renderBooks();
}

function onReadBookModal(bookId) {
    gBookId = bookId;
    var book = getBook(bookId);

    $('#bookModalImg').html(`<img src="${book.imgUrl}" class="img-thumbnail">`);
    $('#bookModalTitle').text(book.title);
    $('#bookModalBody').text(book.desc);
    $('#bookRating').text(book.rating);

}

function onRatingBook(value) {

    ratingBook(value, gBookId);
    var book = getBook(gBookId);
    $('#bookRating').text(book.rating);
}

function onSetLang(lang) {
    setLang(lang);

    if (lang === 'he') document.body.classList.add('rtl');
    else document.body.classList.remove('rtl');

    renderBooks()
    doTrans();
}