
// Add new book to collection
const bookContainer = document.querySelector('.book-container');
const form = document.querySelector('.form');
const title = document.querySelector('.title');
const author = document.querySelector('.author');
const addBtn = document.querySelector('.btn');
const bookList = document.querySelector('.book-list')

let books = [];

form.addEventListener('submit', addBook);

//  Add book Function
function addBook(e){
    e.preventDefault();
    const titleValue = title.value;
    const authorValue = author.value;
    const id = new Date().getTime().toString();
    if(titleValue && authorValue) {
        const book = document.createElement('article');
        book.className = 'book';
        const attr = document.createAttribute('data-id');
        attr.value = id;
        book.setAttributeNode(attr); 
        book.innerHTML = `<p class="book-title">${titleValue}</p>
        <p class="book-author">${authorValue}</p>
        <button class="remove">Remove</button>
        <hr>`;

        let bk = {}
            bk.title = titleValue;
            bk.author = authorValue;
            bk.id = id;
        

        const removeBtn = book.querySelector('.remove');
        removeBtn.addEventListener('click', removeBk);
        bookList.appendChild(book);
        bookContainer.classList.add('show-container');
        
        addToLocalStorage(id, bk)
        
        setBackToDefault();
    } else {
        alert("Enter book title and author")
    }
}

// remove book function
function removeBk(e){
    const element = e.currentTarget.parentElement;
    const id = element.dataset.id;
    
    bookList.removeChild(element);
    
    removeFromLocalStorage(id);
}

// reset inputs
function setBackToDefault() {
    title.value = '';
    author.value = '';
}

// LOCAL STORAGE
function addToLocalStorage(id, bk) {
    const book = {id, bk};
    let arr = getFromLocalStorage();
    console.log(arr)
    arr.push(book);
    localStorage.setItem('bkList', JSON.stringify(arr))
}

function removeFromLocalStorage(id) {
    let arr = getFromLocalStorage();
    arr = arr.filter((obj)=> {
        if(obj.id !== id){
            return obj;
        }
    });
    localStorage.setItem('bkList', JSON.stringify(arr));
}
function getFromLocalStorage(){
    return localStorage.getItem('bkList')?JSON.parse(localStorage.getItem('bkList')):[];
}

// Load books on refresh
window.addEventListener('DOMContentLoaded', loadBooks);

// load books function
function loadBooks () {
    let arr = getFromLocalStorage();
    if (arr.length > 0) {
        arr.forEach((buk)=> {
            
            const book = document.createElement('article');
            book.className = 'book';
            const attr = document.createAttribute('data-id');
            attr.value = buk.id;
            book.setAttributeNode(attr); 
            book.innerHTML = `<p class="book-title">${buk.bk.title}</p>
            <p class="book-author">${buk.bk.author}</p>
            <button class="remove">Remove</button>
            <hr>`;
            
            let bk = {}
                bk.title = buk.bk.titleValue;
                bk.author = buk.bk.authorValue;
                bk.id = buk.id;
            

            const removeBtn = book.querySelector('.remove');
            removeBtn.addEventListener('click', removeBk);
            bookList.appendChild(book);
            bookContainer.classList.add('show-container');
            })
    }
}
