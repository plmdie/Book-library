
window.onload = () => {
    addEvents();
    showBooks();
}

//move to function
const bookTitleEl = document.getElementById("book-title");
const authorEl = document.getElementById("author");
const pagesEl = document.getElementById("pages");
const statusEl = document.querySelector("#read");
const cards = document.querySelector("#cards");

let library = [
    {
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
];


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

    getStatus() {
        console.log(this.status);
        this.status ? this.status = false : this.status = true;
    }
}

function addToLibrary() {
    const [title, author, pages, status] = getBookData();
    const newBook = new Book(title, author, pages, status);
    const validate = library.find(book => book.title === title);
    if (!validate) {
        library.push(newBook);
        modal.style.display = "none";
        updateBookList();
    } else alert("Book already exists in library");
}

function getBookData() {
    const title = bookTitleEl.value;
    const author = authorEl.value;
    const pages = pagesEl.value;
    const status = statusEl.checked;
    return [title, author, pages, status];
}

function showBooks() {
    library.forEach((el, index) => {
        const valid = document.querySelector(`.card${index}`);
        if (!valid) createBookCard(el.title, el.author, el.pages, el.status, index);
    }); 

    
}

function createBookCard(title, author, pages, status, index) {

    //create div .card
    const cardItem = document.createElement('div');
    cardItem.classList.add(`card`);
    cardItem.classList.add(`card${index}`);
    cardItem.innerHTML = `
        <p>${title}</p>
        <p>${author}</p>
        <p>${pages}</p>`;
    cards.appendChild(cardItem);

    //select last created card
    const lastCard = document.querySelector(`.card${index}`)
    
    //create read status button
    const readStatus = document.createElement('button');
    readStatus.setAttribute('data-title', index);
    readStatus.classList.add(`change-status`);
    readStatus.classList.add(`${status}`); 
    status ? readStatus.textContent = 'Finished' : readStatus.textContent = 'Not finished';
    lastCard.appendChild(readStatus);   

    //create remove book button
    const removeBtn = document.createElement('button');
    removeBtn.classList.add("remove-button");
    removeBtn.setAttribute('data-title', index);
    removeBtn.textContent = 'Remove book';
    lastCard.appendChild(removeBtn);
    
    //add event listener
    updateEventListener();
}

function updateBookList() {
    const i = library.length - 1;
    createBookCard(library[i].title, library[i].author, library[i].pages, library[i].status, i); 
}

function removeBook(e) {
    const bookItem = e.target.getAttribute("data-title");
    const element = document.querySelector(`.card${bookItem}`);

    library.splice(bookItem, 1);
    element.remove();
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
    for (let i = 0; i < library.length; i++) {
        document.querySelector(`.card${i}`).remove();    
        
    }
    
}

function updateEventListener() {
    const statusCheckbox = document.querySelectorAll(".change-status");
    const removeButtons = document.querySelectorAll(".remove-button");

    statusCheckbox.forEach(item => item.addEventListener('click', changeStatus));
    removeButtons.forEach(item => item.addEventListener('click', removeBook));
}