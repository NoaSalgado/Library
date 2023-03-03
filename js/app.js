// Objects
class Book {
  constructor(cover, title, author, pages, read) {
    this.cover = cover;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    if (!this.books.includes(book.name)) {
      this.books.push(book);
    }
  }

  removeBook(bookTitle) {
    this.books = this.books.filter((book) => book.title !== bookTitle);
  }
}
const library = new Library();

// DOM Elements
const newBookBtn = document.querySelector(".btn--new-book");
const form = document.querySelector(".form");
const booksContainer = document.querySelector(".books-container");

// Functionality
function showForm() {
  form.classList.add("visible");
}

function hideForm() {
  form.classList.remove("visible");
}

function changeBookStatus(e) {
  const status = e.target.parentNode.nextSibling.textContent;
  e.target.parentNode.nextSibling.textContent =
    status === "READ" ? "NOT READ" : "READ";
  const bookTitle =
    e.target.parentNode.parentNode.parentNode.previousSibling.previousSibling
      .previousSibling.textContent;
  const targetBook = library.books.filter((book) => book.title === bookTitle);
  targetBook[0].read = !targetBook[0].read;
}

function removeBook(e) {
  const bookTitle =
    e.target.parentNode.parentNode.previousSibling.previousSibling
      .previousSibling.textContent;
  library.removeBook(bookTitle);
  updateBooksContainer();
}

function displayBook(book) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book", "flex");

  const bookCover = document.createElement("div");
  bookCover.classList.add("book__cover");
  bookCover.innerHTML = `<img src="${book.cover}"/>`;

  const bookTitle = document.createElement("p");
  bookTitle.classList.add("book__title");
  bookTitle.textContent = `${book.title}`;

  const bookAuthor = document.createElement("p");
  bookAuthor.textContent = `${book.author}`;

  const bookPages = document.createElement("p");
  bookPages.classList.add("book__pages");
  bookPages.textContent = `${book.pages} pages`;

  const bookStatus = document.createElement("div");
  bookStatus.classList.add("flex", "book__status");

  const toggleReadBtn = document.createElement("button");
  toggleReadBtn.classList.add("btn", "btn--toggle-read");
  toggleReadBtn.innerHTML = '<i class="fa-solid fa-book-open"></i>';
  const isReadText = document.createElement("p");
  isReadText.textContent = `${book.read ? "READ" : "NOT READ"}`;

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("btn", "btn--remove");
  removeBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  bookStatus.append(toggleReadBtn);
  bookStatus.append(isReadText);
  bookStatus.append(removeBtn);

  bookCard.append(bookCover);
  bookCard.append(bookTitle);
  bookCard.append(bookAuthor);
  bookCard.append(bookPages);
  bookCard.append(bookStatus);

  booksContainer.append(bookCard);

  toggleReadBtn.addEventListener("click", changeBookStatus);
  removeBtn.addEventListener("click", removeBook);
}

function updateBooksContainer() {
  booksContainer.innerHTML = "";
  library.books.forEach((book) => {
    displayBook(book);
    console.log(book);
  });
}

// Events
newBookBtn.addEventListener("click", showForm);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const imageUrl = document.querySelector("#image-url").value;
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const isRead = document.querySelector("#read").checked;

  const book = new Book(imageUrl, title, author, pages, isRead);

  hideForm();
  library.addBook(book);
  displayBook(book);
});
