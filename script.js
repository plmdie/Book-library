
const modal = document.getElementById("modal");
const addBook = document.getElementById("add-book");
const addNewBook = document.getElementById("addBtn");

//move to function
const bookTitleEl = document.getElementById("book-title");
const authorEl = document.getElementById("author");
const pagesEl = document.getElementById("pages");
const statusEl = document.querySelector("#read");
const cards = document.querySelector("#cards");

let library = [];

//create function start event listeners


addBook.onclick = () => modal.style.display = "block";

addNewBook.onclick = () => addToLibrary();

window.onclick = (event) => {if (event.target == modal) modal.style.display = "none";}


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
    library.push(newBook);
    modal.style.display = "none";
    updateBookList();
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
        createBookCard(el.title, el.author, el.pages, el.status, index);
    }); 

}

function createBookCard(title, author, pages, status, index) {

    //create div .card
    const cardItem = document.createElement('div');
    cardItem.classList.add(`card`);
    cardItem.classList.add(`card${index}`);
    cardItem.setAttribute('data-title', index);
    cardItem.innerHTML = `
        <p>${title}</p>
        <p>${author}</p>
        <p>${pages}</p>`;
    cards.appendChild(cardItem);

    //select last created card
    const lastCard = document.querySelector(`.card${index}`)
    
    //create read status button
    const readStatus = document.createElement('button');
    readStatus.classList.add(`${status}`); 
    status ? readStatus.textContent = 'Finished' : readStatus.textContent = 'Not finished';
    lastCard.appendChild(readStatus);   

    //create remove book button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove book';
    lastCard.appendChild(removeBtn);
}

function updateBookList() {
    const i = library.length - 1;
    createBookCard(library[i].title, library[i].author, library[i].pages, library[i].status, i); 
}

function removeBook() {

}

function changeStatus() {

}

function clearLibrary() {

}