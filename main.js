// Add new book to collection
const bookContainer = document.querySelector('.book-container');
const form = document.querySelector('.form');
const title = document.querySelector('.title');
const author = document.querySelector('.author');

const bookList = document.querySelector('.book-list');

// LOCAL STORAGE
function getFromLocalStorage() {
  return localStorage.getItem('bkList') ? JSON.parse(localStorage.getItem('bkList')) : [];
}

function addToLocalStorage(id, bk) {
  const book = { id, bk };
  const arr = getFromLocalStorage();

  arr.push(book);
  localStorage.setItem('bkList', JSON.stringify(arr));
}

function removeFromLocalStorage(id) {
  let arr = getFromLocalStorage();
  arr = arr.filter((obj) => {
    if (obj.id !== id) {
      return true;
    }
    return false;
  });
  localStorage.setItem('bkList', JSON.stringify(arr));
}

// remove book function
function removeBk(e) {
  const element = e.currentTarget.parentElement;
  const { id } = element.dataset;

  bookList.removeChild(element);

  removeFromLocalStorage(id);
}

// reset inputs
function setBackToDefault() {
  title.value = '';
  author.value = '';
}

//  Add book Function
function addBook(e) {
  e.preventDefault();
  const titleValue = title.value;
  const authorValue = author.value;
  const id = new Date().getTime().toString();
  if (titleValue && authorValue) {
    const book = document.createElement('article');
    book.className = 'book';
    const attr = document.createAttribute('data-id');
    attr.value = id;
    book.setAttributeNode(attr);
    book.innerHTML = `<p class="book-title">${titleValue}</p>
        <p class="book-author">${authorValue}</p>
        <button class="remove">Remove</button>
        <hr>`;

    const bk = {};
    bk.title = titleValue;
    bk.author = authorValue;
    bk.id = id;

    const removeBtn = book.querySelector('.remove');
    removeBtn.addEventListener('click', removeBk);
    bookList.appendChild(book);
    bookContainer.classList.add('show-container');

    addToLocalStorage(id, bk);

    setBackToDefault();
  }
}

// load books function
function loadBooks() {
  const arr = getFromLocalStorage();
  if (arr.length > 0) {
    arr.forEach((buk) => {
      const book = document.createElement('article');
      book.className = 'book';
      const attr = document.createAttribute('data-id');
      attr.value = buk.id;
      book.setAttributeNode(attr);
      book.innerHTML = `<p class="book-title">${buk.bk.title}</p>
            <p class="book-author">${buk.bk.author}</p>
            <button class="remove">Remove</button>
            <hr>`;

      const bk = {};
      bk.title = buk.bk.titleValue;
      bk.author = buk.bk.authorValue;
      bk.id = buk.id;

      const removeBtn = book.querySelector('.remove');
      removeBtn.addEventListener('click', removeBk);
      bookList.appendChild(book);
      bookContainer.classList.add('show-container');
    });
  }
}

// Add book
form.addEventListener('submit', addBook);

// Load books on refresh
window.addEventListener('DOMContentLoaded', loadBooks);
