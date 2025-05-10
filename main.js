const myLibrary= [];

class Book {
    constructor( title, author, pages, read, coverImage) {
        //this.id = id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.coverImage= coverImage;
    }
}


// 3------------------------------------------------------------------
class DisplayBook {
    constructor(book) {
        const cards = document.createElement('div');
        cards.classList.add('book-card');

        
        // Create image element
        const img = document.createElement('img');
        img.src = book.coverImage; // Add 'coverImage' property to the Book class
        img.alt = `${book.title} cover`;
        img.classList.add('book-cover');
        
        cards.appendChild(img);
        // Inject HTML
        cards.innerHTML = `
            <div><span>Title: </span>${book.title}</div>
            <div><span>Author: </span>${book.author}</div>
            <div><span>Pages: </span>${book.pages}</div>
            <div>
                <input type="checkbox" class="read" ${book.read ? 'checked' : ''}>
                <span class="status">${book.read ? 'Read' : 'Not Read'}</span>
            </div>
            <button class="delete">Delete</button>
        `;

        // Prepend the image to the card
        cards.prepend(img);


        // Select the checkbox and span **inside** this card
        const readCheckbox = cards.querySelector('.read');
        const readSpan = cards.querySelector('.status');

        // Add listener to update status when checkbox is clicked
        readCheckbox.addEventListener('change', () => {
            readSpan.textContent = readCheckbox.checked ? 'Read' : 'Not Read';
        });

        // Define the Delete Button
        const dltTable = cards.querySelector('.delete')
        dltTable.addEventListener('click', () =>{
            cards.remove()
            // container.removeChild(cards)
            const index= myLibrary.indexOf(book)
            if (index > -1) {
                myLibrary.splice(index, 1)
            }
            console.log("library Now: ", myLibrary)
            
        })

        // Finally add the card to the DOM
        const container = document.querySelector('.showbooks')
        container.appendChild(cards)
    }
    static cancelbtn() {
        const cancel = document.getElementById('cancel')
        cancel.addEventListener('click', () => {
            console.log('Am Working')
            ClearForm.clearAllInputs()
            form.style.display= 'none'
        })
    }
    // Define Save Button
    static savebtn() {
        const save = document.getElementById('save');
        save.addEventListener('click', () =>{
                const titleInput      = document.getElementById('title');  //${book.read === true ? 'READ' : 'Not read'}
                const authorInput     = document.getElementById('author');
                const pagesInput      = document.getElementById('pages');
                const readboxInput    = document.getElementById('check');
                const coverImageInput = document.getElementById('coverImageInput');
                const reader = new FileReader();
                reader.onload = function (e) {
                    coverImageInput = e.target.result;
                    const newBook = new Book(title, author, pages, read, coverImagePath);
                    myLibrary.push(newBook);
                    new DisplayBook(newBook);
                    ClearForm.clearAllInputs();
                }
            
                const id = myLibrary.length + 1
                const title  = titleInput.value.trim()
                const author = authorInput.value.trim()
                const pages = parseInt(pagesInput.value.trim())
                const read = readboxInput.checked;
            
                if (title && author && pages !== "" &&
                    pages > 0 && pages < 1000 
                ){
                console.log(id, title,author, pages, read)
                new AddBookToLibrary(title, author, pages, read);
                ClearForm.clearAllInputs()
                } else {
                    alert(`pls fill up the empty filed`)
                }      
        })
    }
}
DisplayBook.cancelbtn()
DisplayBook.savebtn()

// Class To Add new Books To the Library and Display it
class AddBookToLibrary {
    constructor( title, author, pages, read) {
        const newBook = new Book( title, author, pages, read);
        myLibrary.push(newBook);
        new DisplayBook(newBook);
    }
}


// changing from read to not read:
const change = document.getElementById('check')
const changeSpan = document.getElementById('readboxspan')
change.addEventListener('change', () => {
     changeSpan.textContent = change.checked ? 'READ' :'NOT READ';
})

// Clear the form
class ClearForm {
        static clearAllInputs () {
        document.getElementById('title').value='';
        document.getElementById('author').value='';
        document.getElementById('pages').value='';
        document.getElementById('coverImageInput').value='';
        document.getElementById('check').checked=false;
        document.getElementById('readboxspan').textContent='NOT READ';
        
    }
}

// Redefine Books
const book1   = new Book('Subconscious Mind', 'Ibn Khaldon', 442, true, 'images/subconscious_mind.jpg');
const book2   = new Book('JScript', 'Chuks Walt', 682, true, 'images/JavaScript.jpg');
const book3   = new Book('Simplicity', 'Nancy Brath', 515, false, 'images/scoop.jpg');
const book4   = new Book('code', 'Omer Yildiz', 688, true, 'images/code.jpg');

myLibrary.push(book1,book2,book3,book4)
myLibrary.forEach(book =>  new DisplayBook(book))

// Working on style Mode
const form = document.querySelector('.form')
const addBook = document.querySelector('.addBook')
addBook.addEventListener('click', () => {
    form.style.display = 'flex';
    // form.style.padding = '20px'
})
