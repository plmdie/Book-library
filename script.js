
window.onload = () => addEvents();

let library = [];

let preLibrary = [
    {
        title: 'Dune',
        author: 'Frank herbert',
        pages: 431,
        status: true
    },
    {
        title: 'Harry Potter',
        author: 'J. K. Rowling',
        pages: 213,
        status: false
    }
] 

function addEvents() {
    const modal = document.getElementById("modal");
    const addBook = document.querySelector(".add-button");
    const addNewBook = document.querySelector("#add-new-book");
    const clearBtn = document.querySelector(".clear-library");

    showPreBooks();
    updateLibraryStats();

    clearBtn.addEventListener('click', removeAllBooks);
    addNewBook.onsubmit = function(e) {
        e.preventDefault();
        addToLibrary();  
    } 
    addBook.onclick = () => modal.className = "visible";
    window.onclick = (event) => {if (event.target == modal) modal.className = "hidden";}
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
        modal.className = "hidden";
        const index = library.findIndex(book => book.title === newBook.title);
        createBookCard(newBook.title, newBook.author, newBook.pages, newBook.status, index); 
        setTimeout(clearForm, 600);
        updateLibraryStats();
    } else alert("Book already exists in library");
}

function clearForm() {
    document.getElementById("book-title").value = '';
    document.getElementById("author").value = '';
    document.getElementById("pages").value = '';
    document.querySelector("#read").checked = false;
}

function createBook(title, author, pages, status) {
    return new Book (title, author, pages, status);
}

function getBookData() {
    const title = document.getElementById("book-title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const status = document.querySelector("#read").checked;
    return new Book (title, author, pages, status);
}

function createBookCard(title, author, pages, status, index) {
    const cards = document.querySelector("#cards");
    const cardItem = document.createElement('div');
    let readStatus;

    status ? readStatus = 'Read' : readStatus = 'Not read';
    //create card div
    cardItem.classList.add(`card`);
    cardItem.classList.add(`card${index}`);
    cardItem.bookIndex = index;
    cardItem.innerHTML = `
        <p class='items'>${title}</p>
        <p class='items'>By <b>${author}</b></p>
        <p class='items'>Total pages: <b>${pages}</b></p>
        <p class='items'><b>${readStatus}</b></p>`;
    
    cardItem.addEventListener('mouseenter', addButtons);
    cardItem.addEventListener('mouseleave', disableButtons);
    
    //append elements to DOM
    cards.appendChild(cardItem);
}


function showPreBooks() {
    preLibrary.forEach((el, index) => {
        const Book = createBook(el.title, el.author, el.pages, el.status);
        library.push(Book);
        createBookCard(el.title, el.author, el.pages, el.status, index);
        
    });  
}

function showBooks() {
    library.forEach((el, index) => createBookCard(el.title, el.author, el.pages, el.status, index));
}

function removeBook(e) {
    const bookItem = e.currentTarget.bookIndex;
    const el = document.querySelector(`.card${bookItem}`);

    library.splice(bookItem, 1);
    
    el.remove();
    
    updateLibraryStats();
}

function changeStatus(e) {
    const bookItem = e.currentTarget.bookIndex;
    const readStatus = document.querySelector('.read-status');
    
    library[bookItem].getStatus();
    if (library[bookItem].status) {readStatus.style.backgroundColor = 'rgb(23, 93, 197)';} 
    else {readStatus.style.backgroundColor = 'rgb(226, 83, 27)';}
    updateLibraryStats();
}

function clearLibrary() {
    const element = document.querySelectorAll(`.card`);
    element.forEach(el => el.remove());
}

function removeAllBooks() {
    const element = document.querySelectorAll(`.card`);
    element.forEach(el => el.remove());
    library = [];
    updateLibraryStats();
}

function updateLibraryStats() {
    const statsBooks = document.querySelector('.books');
    const statsRead = document.querySelector('.read');
    const statsUnread = document.querySelector('.unread');
    let readCount = 0;
    
    library.forEach((el) => {if (el.status === true) readCount++;}); 
    
    statsBooks.textContent = library.length;
    statsRead.textContent = readCount;
    statsUnread.textContent = library.length - readCount;
}

function addButtons(e) {
    const index = e.currentTarget.bookIndex;
    const card = document.querySelector(`.card${index}`);
    const items = document.querySelectorAll(`.card${index} > .items`);
    const statusBtn = document.createElement('div');
    const removeBtn = document.createElement('div');

    for (const p of items) p.classList.add('blur');
    
    //add button for changing read status
    statusBtn.classList.add('read-status');
    statusBtn.innerHTML = '<i class="fa-solid fa-book-open"></i>';

    //changing color based on read status
    library[index].status ? statusBtn.style.backgroundColor = 'rgb(23, 93, 197)' : statusBtn.style.backgroundColor = 'rgb(226, 83, 27)';
    
    //listener to change status function
    statusBtn.bookIndex = index;
    statusBtn.addEventListener('click', changeStatus);
   
    //add button to remove book
    removeBtn.classList.add('remove-card');
    removeBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

    //listener to remove book function
    removeBtn.bookIndex = index; 
    removeBtn.addEventListener('click', removeBook);

    card.append(statusBtn, removeBtn);
}

function disableButtons() {
    const items = document.querySelectorAll('.items');

    for (const p of items) p.classList.remove('blur');
   
    clearLibrary();
    showBooks();
}