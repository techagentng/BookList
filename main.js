//Book class represents a book
class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn  = isbn;
    }
}

//UI class: this will track DoM changes e.g. alert,display of dom changes,

class UI{
    static displayBooks(){
 

        const books = storeBooks;
        books.forEach((book)=> UI.addBookToList(book)); 
    }
    //Clear input fields after the form has been submitted
    static clearFields(){
        document.querySelector('#title').value = "";
        document.querySelector('#author').value = ""
        document.querySelector('#isbn').value = ""
    }
    //SHOW ALERT
    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
    }
    //Delete a book with event propergation
    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }
    // This function allows u to create a row and append into DOM 
    static addBookToList(book){
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
         row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">x</a></td>
        `;

        list.appendChild(row);
    } 
}


//Handles storage 

//events to display books
document.addEventListener('DOMContentLoaded', UI.displayBooks)

//Events to add a book
document.querySelector('#book-form').addEventListener('submit', (e)=>{
    //prevent default action
    e.preventDefault();
   
    //get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

     //VALIDATE INPUT VALUES
     if(title === "" || author === "" || isbn ===""){
        UI.showAlert('please fill in all fields', 'danger');
    }else{
        //Instantiate book
        const newBook = new Book(title, author, isbn);
        UI.showAlert('Thanks for the feedback', 'success')
           //Add newBook to UI
        UI.addBookToList(newBook);
        UI.clearFields();
    }
});

//Events: to remove a book

const closeBtn =  document.querySelector('#book-list').addEventListener('click', (el)=>{
    UI.deleteBook(el.target);
})
 
