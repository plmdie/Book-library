
window.onload = () => addEvents();


let library = [];

function addEvents() {
    const modal = document.getElementById("modal");
    const addBook = document.getElementById("add-book");
    const addNewBook = document.getElementById("add-new-book");

    addBook.onclick = () => modal.className = "visible";
    addNewBook.onsubmit = function(e) {
        e.preventDefault();
        addToLibrary();    
    } 
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
    } else alert("Book already exists in library");
}

function clearForm() {
    document.getElementById("book-title").value = '';
    document.getElementById("author").value = '';
    document.getElementById("pages").value = '';
    document.querySelector("#read").checked = false;
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
