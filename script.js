class Book {
  constructor(name, author, pages, pagesRead) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.pagesRead = pagesRead;
  }

  get isRead() {
    return this.pages === this.pagesRead;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  add(book) {
    this.books.push(book);
  }

  remove(index) {
    this.books.splice(index, 1);
  }

  find(name) {
    name = name.toLowerCase();
    return this.books.findIndex(book => book.name.toLowerCase() === name);
  }

  get size() {
    return this.books.size;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const bookShelf = document.getElementById('book-shelf');
  const addBookButton = document.getElementById('add-book');
  const header = document.querySelector('header');
  const footer = document.querySelector('footer');

  function handleHeaderFooterBehavior() {
    if (window.scrollY !== 0 && !header.classList.contains('elevation')) {
      header.classList.add('elevation');
    } else if (window.scrollY === 0) {
      header.classList.remove('elevation');
    }

    const minScrollY = window.scrollY + 16;
    const currentScrollPosition = document.body.scrollHeight - window.innerHeight;
    if (minScrollY < currentScrollPosition && !footer.classList.contains('elevation')) {
      footer.classList.add('hide');
    } else if (minScrollY >= currentScrollPosition) {
      footer.classList.remove('hide');
    }
  }

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
  }

  window.addEventListener('scroll', handleHeaderFooterBehavior);
  window.addEventListener('resize', handleHeaderFooterBehavior);
  (new ResizeObserver(handleHeaderFooterBehavior)).observe(document.body);

  addBookButton.addEventListener('click', () => {
    const book = document.createElement('div');
    book.classList.add('book');
    book.innerHTML = `
      <button class="ph-x-bold close button action show-on-hover"></button>
      <p class="title">Title</p>
      <p class="author">Author</p>
      <div class="flex align-center read-status">
        <button class="ph-book-fill small button action"></button>
        <span>Pages left</span>
      </div>
    `;
    bookShelf.appendChild(book);
  });
});

window.addEventListener('load', () => document.body.classList.remove('preload'));
