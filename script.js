function main() {
  Object.keys(localStorage)
    .forEach(e => addBookToLibrary(JSON.parse(localStorage.getItem(e))));

  (new ResizeObserver(handleScroll)).observe(document.body);
  window.addEventListener('wheel', throttle(handleScroll, 500), { capture: true, passive: true });
  window.addEventListener('resize', handleScroll);
  document.getElementById('change-theme').addEventListener('click', toogleTheme);

  document.getElementById('add-book').addEventListener('click', handleModal);
  document.getElementById('add-book-modal-close').addEventListener('click', handleModal);
  document.getElementById('add-book-modal-overlay').addEventListener('click', handleModal);

  document.getElementById('add-book-modal-submit').addEventListener('click', handleSubmit);

  document.getElementById('title-input').addEventListener('blur', (e) => 
    document.getElementById('title-error-message')
      .classList[e.target?.value ? 'add' : 'remove' ]('hidden')
  );
  document.getElementById('author-input').addEventListener('blur', (e) => 
    document.getElementById('author-error-message')
      .classList[e.target?.value ? 'add' : 'remove' ]('hidden')
  );
  document.getElementById('pages-input').addEventListener('blur', (e) => {
    const pages = +e.target?.value;
    const pagesRead = +document.getElementById('pages-read-input')?.value;
    document.getElementById('pages-error-message')
      .classList[pages > 0 ? 'add' : 'remove' ]('hidden');
    document.getElementById('pages-read-error-message')
      .classList[pagesRead >= 0 && pagesRead <= pages ? 'add' : 'remove']('hidden');
  });
  document.getElementById('pages-read-input').addEventListener('blur', (e) => {
    const pages = +document.getElementById('pages-input')?.value;
    const pagesRead = +e.target?.value;
    document.getElementById('pages-read-error-message')
      .classList[pagesRead >= 0 && pagesRead <= pages ? 'add' : 'remove']('hidden');
  });

  if (window.matchMedia('(prefers-color-scheme: dark)').matches)
    toogleTheme();
}

function handleModal() {
  document.getElementById('add-book-modal').classList.toggle('invisible');
  document.body.classList.toggle('overflow-hidden');

  if (document.body.classList.contains('overflow-hidden')) {
    document.getElementById('title-input').value = "";
    document.getElementById('title-error-message').classList.add('hidden');
    document.getElementById('author-input').value = "";
    document.getElementById('author-error-message').classList.add('hidden');
    document.getElementById('pages-input').value = "";
    document.getElementById('pages-error-message').classList.add('hidden');
    document.getElementById('pages-read-input').value = "";
    document.getElementById('pages-read-error-message').classList.add('hidden');
    document.getElementById('title-input').focus();
  }
}

function handleSubmit(e) {
  e?.preventDefault();

  const input = {
    title: document.getElementById('title-input'),
    author: document.getElementById('author-input'),
    pages: document.getElementById('pages-input'),
    pagesRead: document.getElementById('pages-read-input')
  }

  // NOTE: Shitty workaround to force validation based on blur
  Object.keys(input).forEach(e => {
    input[e].focus();
    input[e].blur();
  })

  const anyErrors =
    document.getElementById('add-book-form')
      .querySelectorAll('.hidden').length !== Object.keys(input).length;

  if (anyErrors) return;

  addBookToLibrary(createBook(
    input.title.value,
    input.author.value,
    +input.pages.value,
    +input.pagesRead.value
  ));

  handleModal();
}

function handleScroll() {
  const isScrollOnTop = window.scrollY === 0;
  const isScrollOnBottom = window.scrollY === document.body.scrollHeight - window.innerHeight;
  document.querySelector('header')
    .classList[isScrollOnTop ? 'remove' : 'add']('drop-shadow');
  document.querySelector('footer')
    .classList[isScrollOnBottom ? 'remove' : 'add']('drop-shadow');
}

function toogleTheme() {
  const button = document.getElementById('change-theme');
  button.classList.toggle('ph-moon-bold');
  button.classList.toggle('ph-sun-bold');
  document.documentElement.classList.toggle('dark');
}

function throttle(callback, delay) {
  let wait = false;

  return function() {
    if (wait) return;

    callback();
    wait = true;
    setTimeout(() => wait = false, delay)
  }
}

function addBookToLibrary(book) {
  const element = document.createElement('button');
  element.className = 'bg-zinc-400 dark:bg-zinc-700 drop-shadow hover:drop-shadow-2xl h-48 rounded-xl transition-[drop-shadow] duration-350';

  const title = document.createElement('h2');
  title.className = 'text-xl'
  title.innerText = book.title;

  const author = document.createElement('h3');
  author.className = 'text-lg'
  author.innerText = book.author;

  const pagesDescription = document.createElement('p');
  pagesDescription.innerText = book.alreadyRead
    ? 'Already read'
    : `${book.pagesRead} of ${book.pages} read`;

  element.appendChild(title);
  element.appendChild(author);
  element.appendChild(pagesDescription);

  localStorage.setItem(book.title, JSON.stringify(book));
  document.getElementById('bookshelf').appendChild(element);
}

function createBook(title, author, pages, pagesRead = 0) {
  return {
    title,
    author,
    pages,
    _pagesRead: pagesRead,
    set pagesRead(value) {
      this._pagesRead = clamp(0, this._pagesRead + value, this.pages);
    },
    get pagesRead() {
      return this._pagesRead;
    },
    get alreadyRead() {
      return this.pages === this._pagesRead;
    }
  };
}

function clamp(min, mid, max) {
  return Math.max(min, Math.min(mid, max));
}

window.addEventListener('DOMContentLoaded', main);
