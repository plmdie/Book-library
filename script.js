
window.onload = () => {
    addEvents();
    /* showBooks(); */
}

//move to function
const bookTitleEl = document.getElementById("book-title");
const authorEl = document.getElementById("author");
const pagesEl = document.getElementById("pages");
const statusEl = document.querySelector("#read");
const cards = document.querySelector("#cards");

let library = [];
   /*  {
        title: 'Dune',
        author: 'jean lol',
        pages: 198,
        status: true     
    },

    {
        title: 'Dune II',
        author: 'jean pierre',
        pages: 154,
        status: false     
    }
]; */


//change how function works by reading event target
function addEvents() {
    const modal = document.getElementById("modal");
    const addBook = document.getElementById("add-book");
    const addNewBook = document.getElementById("add-new-book");

    addBook.onclick = () => modal.style.display = "block";
    addNewBook.onsubmit = function(e) {
        e.preventDefault();
        addToLibrary();    
    } 

    window.onclick = (event) => {if (event.target == modal) modal.style.display = "none";}
}


class Book {
    constructor(title, author, pages, status){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }

    getStatus() {this.status = !this.status;}
}



function addToLibrary() {
    const newBook = getBookData();    
    //check if book exists
    const validate = library.find(book => book.title === newBook.title);
    if (!validate) {
        library.push(newBook);
        modal.style.display = "none";
        const index = library.findIndex(book => book.title === newBook.title);
        createBookCard(newBook.title, newBook.author, newBook.pages, newBook.status, index); 
    } else alert("Book already exists in library");
}

function getBookData() {
    const title = bookTitleEl.value;
    const author = authorEl.value;
    const pages = pagesEl.value;
    const status = statusEl.checked;
    return new Book (title, author, pages, status);
}

function createBookCard(title, author, pages, status, index) {
    const cardItem = document.createElement('div');
    const readStatus = document.createElement('button');
    const removeBtn = document.createElement('button');

    //create card div
    cardItem.classList.add(`card`);
    cardItem.innerHTML = `
        <p>${title}</p>
        <p>${author}</p>
        <p>${pages}</p>`;
 
    //create read status button
    readStatus.setAttribute('data-title', index);
    readStatus.classList.add(`change-status`);
    readStatus.classList.add(`${status}`); 
    status ? readStatus.textContent = 'Finished' : readStatus.textContent = 'Not finished';
    readStatus.addEventListener('click', changeStatus);

    //create remove book button
    removeBtn.classList.add("remove-button");
    removeBtn.setAttribute('data-title', index);
    removeBtn.textContent = 'Remove book';
    removeBtn.addEventListener('click', removeBook);

    //append elements to DOM
    cardItem.appendChild(readStatus);   
    cardItem.appendChild(removeBtn);
    cards.appendChild(cardItem);
}


function showBooks() {
    library.forEach((el, index) => createBookCard(el.title, el.author, el.pages, el.status, index)); 
}

function removeBook(e) {
    const bookItem = e.target.getAttribute("data-title");
    library.splice(bookItem, 1);
    clearLibrary();
    showBooks();
}

function changeStatus(e) {
    const bookItem = e.target.getAttribute("data-title");
    if (library[bookItem].status) {
        e.target.classList.replace("true", "false");
        e.target.textContent = "Not finished";
    } else {
        e.target.classList.replace("false", "true");
        e.target.textContent = "Finished";
    }
    library[bookItem].getStatus();
}


function clearLibrary() {
    const element = document.querySelectorAll(`.card`);
    element.forEach(el => el.remove());
}
