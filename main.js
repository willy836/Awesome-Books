
// Add new book to collection
const bookContainer = document.querySelector('.book-container');
const form = document.querySelector('.form');
const title = document.querySelector('.title');
const author = document.querySelector('.author');
const btn = document.querySelector('.btn');
const removeBtn = document.querySelector('.remove')
const list = document.querySelector('.book-list')
let object = {author:"authorValue", title:"titleValue"};

let booksData = [
    {
        title: 'My First Book',
        author: 'John Doe'
    },
    {
        title: 'My Second Book',
        author: 'Jane Doe'
    },
    {
        title: 'My Third Book',
        author: 'Mark Smith'
    },
    {
        title: 'My Fourth Book',
        author: 'Mary Smith'
    }
];
console.log(booksData);


// Add book
form.addEventListener('submit', (e)=> {
    e.preventDefault();
    const titleValue = title.value;
    console.log(titleValue);
    const authorValue = author.value;
    console.log(authorValue);
    
    if(titleValue && authorValue) {
        const book = document.createElement('article');
        book.className = 'book';
        book.innerHTML = `<p class="book-title">${titleValue}</p>
        <p class="book-author">${authorValue}</p>
        <button class="remove">Remove</button>`;
        
        booksData.push(object);
         
        list.appendChild(book);
        bookContainer.classList.add('show-container'); 
    }
});

// console.log(booksData)

// Remove book
// removeBtn.addEventListener('click', ()=> {
//     list.
// })