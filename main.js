
let booksData = [];

// Add new book to collection
const bookContainer = document.querySelector('.book-container');
const form = document.querySelector('.form');
const title = document.querySelector('.title');
const author = document.querySelector('.author');
const btn = document.querySelector('.btn');

const list = document.querySelector('.book-list')

// Retrieve books from localStorage
window.addEventListener('DOMContentLoaded', () => {
    
    const userBooks = JSON.parse(localStorage.getItem('bookStore'));
  
    if (userBooks.length > 0) {
        userBooks.forEach((bk)=> {
            
    createBook(bk.title, bk.author);
    
        })
        
    }
    resetInputs(); 
  });

//   reset form inputs
const resetInputs = ()=> {
    title.value = '';
    author.value = '';
}

// Add book
form.addEventListener('submit', (e)=> {
    e.preventDefault();

    createBook(title.value, author.value);
    resetInputs();
    
    localStorage.setItem('bookStore', JSON.stringify(booksData));
});

function createBook(titleValue, authorValue) {
    title.value = titleValue;
    author.value = authorValue;
    const id = new Date().getTime().toString();

    const book = document.createElement('article');

        book.className = 'book';
        const attr = document.createAttribute('data-id');
        attr.value = id;
        book.setAttributeNode(attr); 
        book.innerHTML = `<p class="book-title">${titleValue}</p>
        <p class="book-author">${authorValue}</p>
        <button class="remove">Remove</button>
        <hr>`;

        let object = {};
        object.title = titleValue;
        object.author = authorValue;
        object.id = id;
        booksData.push(object);
        object = {};

        list.appendChild(book);
        bookContainer.classList.add('show-container');

        const removeBtns = document.querySelectorAll('.remove');
        removeBtns.forEach((removeBtn)=> {
            removeBtn.addEventListener('click', (e)=> {
                const element = e.target.parentElement;
                const id = element.dataset.id;
                
                list.removeChild(element);
                //remove from local storage
                let allBooks = JSON.parse(localStorage.getItem('bookStore'));
                
                allBooks = allBooks.filter((book)=> {
                    if(book.id !== id){
                        console.log(book)
                        return book;
                    }
                    
                });
              //console.log(allBooks)
              localStorage.setItem('bookStore', JSON.stringify(booksData));
              
            })
        })
        
        
}