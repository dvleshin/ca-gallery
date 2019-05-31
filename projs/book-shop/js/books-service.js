'use strict';

var gBooks;

function createBooks() {
    var books;
    books = [
        createBook('Where the Crawdads Sing', 'שם שרים את הסורגים', 'img/Where-the-Crawdads-Sing.jpg', 15.90, 'Where the Crawdads Sing is a 2018 novel by Delia Owens. It topped the The New York Times Fiction Best Sellers of 2019 for twelve weeks of 2019. The story describes the life and adventures of a young girl named Kya in the swamps of North Carolina. '),
        createBook('The Silent Patient', 'החולה השקט', 'img/The-Silent-Patient.jpg', 11.99, 'I love him so totally, completely,sometimes it threatens to overwhelm me.Sometimes I think-No. I won\'t write about that.ALICIA Alicia Berenson writes a diary as a release, an outlet - and to prove to her beloved husband that everything is fine.'),
        createBook('That Month in Tuscany', 'באותו חודש בטוסקנה', 'img/That-Month-in-Tuscany.jpg', 12.29, 'Ren Sawyer and Lizzy Harper live completely different lives. He\'s a rock star with a secret he can no longer live with. She\'s a regular person whose husband stood her up for a long planned anniversary trip.')
    ]

    gBooks = books;
}

function createBook(title, titleHe, imgUrl, price, desc) {
    return {
        bookId: +makeId(),
        title: title,
        titleHe: titleHe,
        price: price,
        imgUrl: imgUrl,
        desc: desc,
        rating: 0
    }
}

function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.bookId;
    })
    gBooks.splice(bookIdx, 1);
}

function addBook(name, price) {
   // debugger;
    var book = createBook(name, '', 'img/nocover.jpg', price)
    gBooks.unshift(book);
}

function updateBookPrice(bookId, bookPrice) {

    var books = gBooks;
    books.forEach(function (book) {
        if (book.bookId === bookId) {
            book.price = bookPrice;
        }
    })
    gBooks = books;
}

function getBook(bookId) {
    return gBooks.find(function (book) {

        return bookId === book.bookId;
    })
}

function ratingBook(value, bookId) {
    var books = gBooks;

    books.forEach(function (book) {
        if (book.bookId === bookId) {
            if (value === 'minus') {
                if (!book.rating) book.rating = 0;
                else --book.rating;
            } else {
                if (book.rating === 10) book.rating = 10;
                else ++book.rating;
            }
        }
    })
    gBooks = books;
}