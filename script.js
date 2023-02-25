//CONTAINER
const formContainer = document.querySelector("#container");
const wishlistContainer = document.querySelector("#wishlist-container");

//FORM
const form = document.querySelector("#form");
const wishlistForm = document.querySelector('#wishlist-form')

//ADD BUTTON
const newBook = document.querySelector("#new-book");
const addWishlist = document.querySelector("#new-wishlistbook")

//OVERLAY LAYER
const overlay = document.querySelector(".overlay");

//CLOSE BUTTON
const closeButton = document.querySelector(".close");
const wishlistCloseButton = document.querySelector(".wishlist-close");

//DIV
const bookshelf = document.querySelector(".bookshelf");
const wishlistBucket = document.querySelector(".wishlist-bucket");

//ARRAY
let books = JSON.parse(localStorage.getItem("books")) || [];
let wishlistBooks = JSON.parse(localStorage.getItem("wishlistBooks")) || [];

//SETTING THE FORM
let formOpen = false;
let wishlistFormOpen = false;

//TOTAL NOs
let nonRead = document.querySelector("#wishlist_count");
let read = document.querySelector("#read_count");
let total = document.querySelector("#books_count");


class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}


//& the second class
class WishlistBook {
    constructor(title) {
        this.title = title;
    }
}


//& checking the status of the form and setting the properties accordingly
function formOpenOrClosed() {
    if (formOpen) {
        formContainer.style.transform = "scale(0)";
        newBook.style.transform = "rotate(0)";
        form.reset();
        overlay.style.opacity = 0;
        formOpen = false;
    } else {
        formContainer.style.transform = "scale(1)";
        newBook.style.transform = "rotate(45deg)";
        overlay.style.opacity = 1;
        formOpen = true;
    }
}



//& checking the status of the wishlist form and setting the properties accordingly
function wishlistFormStatus() {
    if (wishlistFormOpen) {
        wishlistContainer.style.transform = "scale(0)";
        addWishlist.style.transform = "rotate(0)";
        overlay.style.opacity = 0;
        wishlistForm.reset();
        wishlistFormOpen = false;
    } else {
        wishlistContainer.style.transform = "scale(1)";
        addWishlist.style.transform = "rotate(45deg)";
        overlay.style.opacity = 1;
        wishlistFormOpen = true;
    }
}



//&  close add new book modal
function closeModal() {
    formContainer.style.transform = "scale(0)";
    newBook.style.transform = "rotate(0)";
    overlay.style.opacity = 0;
    form.reset();
    formOpen = false;
}


//& close add new wishlist book modal
function closeWishlistModal() {
    wishlistContainer.style.transform = "scale(0)";
    addWishlist.style.transform = "rotate(0)";
    overlay.style.opacity = 0;
    wishlistForm.reset();
    wishlistFormOpen = false;
}



//& add new book 
function addBook(i) {
    let bookNode = document.createElement("div");
    bookNode.classList.add("book");
    bookNode.setAttribute("data-index", `${i}`);

    const title = document.getElementById("title").value;
    let titleNode = document.createElement("h2");
    titleNode.innerHTML = `Title: ${title}`;

    const author = document.getElementById("author").value;
    let authorNode = document.createElement("h3");
    authorNode.innerHTML = `Author: ${author}`;

    const pages = document.getElementById("pages").value;
    let pageNode = document.createElement("h3");
    pageNode.innerHTML = `Pages: ${pages}`;

    const read = document.getElementById("read").value;
    let readNode = document.createElement("h3");
    readNode.innerHTML = `Read: ${read}`;

    let updateNode = document.createElement("button");
    updateNode.classList = "update";
    updateNode.innerHTML = "Update";

    let trashNode = document.createElement("button");
    trashNode.classList = "trash";
    trashNode.innerHTML = "Delete";

    const book = new Book(title, author, pages, read);
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
    bookNode.appendChild(titleNode);
    bookNode.appendChild(authorNode);
    bookNode.appendChild(pageNode);
    bookNode.appendChild(readNode);
    bookNode.appendChild(updateNode);
    bookNode.appendChild(trashNode);
    bookshelf.appendChild(bookNode);


    formOpenOrClosed();
    form.reset();

    //* update book status
    updateNode.addEventListener("click", () => {
        if (readNode.innerHTML === "Read: No") {
            readNode.innerHTML = "Read: Yes";
            book.read = "Yes";
            localStorage.setItem("books", JSON.stringify(books));
        } else {
            readNode.innerHTML = "Read: No";
            book.read = "No";
            localStorage.setItem("books", JSON.stringify(books));
        }
    });
    //* delete book
    trashNode.addEventListener("click", () => {
        bookshelf.removeChild(bookNode);
        books.splice(bookNode, 1);
        localStorage.setItem("books", JSON.stringify(books));
    });
}

//& loading the books 
function getBooks() {
    books.forEach(function (book, i) {
        let bookNode = document.createElement("div");
        bookNode.classList.add("book");
        bookNode.setAttribute("data-index", `${i}`);

        const title = document.getElementById("title").value;
        let titleNode = document.createElement("h2");
        titleNode.innerHTML = `Title: ${book.title}`;

        const author = document.getElementById("author").value;
        let authorNode = document.createElement("h3");
        authorNode.innerHTML = `Author: ${book.author}`;

        const pages = document.getElementById("pages").value;
        let pageNode = document.createElement("h3");
        pageNode.innerHTML = `Pages: ${book.pages}`;

        const read = document.getElementById("read").value;
        let readNode = document.createElement("h3");
        readNode.innerHTML = `Read: ${book.read}`;

        let updateNode = document.createElement("button");
        updateNode.classList = "update";
        updateNode.innerHTML = `Update`;

        let trashNode = document.createElement("button");
        trashNode.classList = "trash";
        trashNode.innerHTML = `Delete`;

        bookNode.appendChild(titleNode);
        bookNode.appendChild(authorNode);
        bookNode.appendChild(pageNode);
        bookNode.appendChild(readNode);
        bookNode.appendChild(updateNode);
        bookNode.appendChild(trashNode);
        bookshelf.appendChild(bookNode);


        //* update book status
        updateNode.addEventListener("click", () => {
            if (readNode.innerHTML === "Read: No") {
                readNode.innerHTML = "Read: Yes";
                book.read = "Yes";
                localStorage.setItem("books", JSON.stringify(books));
            } else {
                readNode.innerHTML = "Read: No";
                book.read = "No";
                localStorage.setItem("books", JSON.stringify(books));
            }
        });

        //*  delete book
        trashNode.addEventListener("click", () => {
            bookshelf.removeChild(bookNode);
            books.splice(bookNode, 1);
            localStorage.setItem("books", JSON.stringify(books));
        });
    });
}


//& add new wishlist item 
function addNewWishlistBook(iwl) {
    let wBookNode = document.createElement("div");
    wBookNode.classList.add("wishlistItem");
    wBookNode.setAttribute("wlb-data-index", `${iwl}`);

    const wTitle = document.getElementById("wishlist-title").value;
    let wTitleNode = document.createElement("h2");
    wTitleNode.innerHTML = `Title: ${wTitle}`;

    let wTrashNode = document.createElement("button");
    wTrashNode.classList = "wishlist-trash";
    wTrashNode.innerHTML = "Delete";


    const wishlistBookItem = new WishlistBook(wTitle);
    wishlistBooks.push(wishlistBookItem);
    localStorage.setItem("wishlistBooks", JSON.stringify(wishlistBooks));
    wBookNode.appendChild(wTitleNode);
    wBookNode.appendChild(wTrashNode);
    wishlistBucket.appendChild(wBookNode);
    wishlistFormStatus();
    wishlistForm.reset();

    //* delete book
    wTrashNode.addEventListener("click", () => {
        wishlistBucket.removeChild(wBookNode);
        wishlistBooks.splice(wBookNode, 1);
        localStorage.setItem("wishlistBooks", JSON.stringify(wishlistBooks));
    });
}


function getWishlist() {
    wishlistBooks.forEach(function (wishlistBookItem, iwl) {
        let wBookNode = document.createElement("div");
        wBookNode.classList.add("wishlistItem");
        wBookNode.setAttribute("wlb-data-index", `${iwl}`);

        const wTitle = document.getElementById("title").value;
        let wTitleNode = document.createElement("h2");
        wTitleNode.innerHTML = `Title: ${wishlistBookItem.title}`;

        let wTrashNode = document.createElement("button");
        wTrashNode.classList = "wishlist-trash";
        wTrashNode.innerHTML = `Delete`;

        wBookNode.appendChild(wTitleNode);
        wBookNode.appendChild(wTrashNode);
        wishlistBucket.appendChild(wBookNode);

        wTrashNode.addEventListener("click", () => {
            wishlistBucket.removeChild(wBookNode);
            wishlistBooks.splice(wBookNode, 1);
            localStorage.setItem("wishlistBooks", JSON.stringify(wishlistBooks));
        });

    })
}

function findTotal (){
    let totalWishList =wishlistBooks.length ;
    let totalRead = books.length;
    let grandTotal = 0;
    nonRead.textContent = `NOT READ : ${totalWishList}`;
    read.textContent = `READ : ${totalRead}`;
    grandTotal = totalRead+totalWishList;
    total.textContent = `TOTAL : ${grandTotal}`;
}


window.addEventListener("load", getBooks);
window.addEventListener("load", findTotal);
window.addEventListener("load", getWishlist);
newBook.addEventListener("click", formOpenOrClosed);
addWishlist.addEventListener("click", wishlistFormStatus);
closeButton.addEventListener("click", closeModal);
wishlistCloseButton.addEventListener("click", closeWishlistModal);

form.addEventListener("submit", (e, i) => {
    e.preventDefault();
    addBook(i);
});


wishlistForm.addEventListener("submit", (e, iwl) => {
    e.preventDefault();
    addNewWishlistBook(iwl);
});