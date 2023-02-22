function main() {
  const bookshelf = document.getElementById('bookshelf');
  const books = [];

  for (let i = 0; i < 9; i++) {
    const book = document.createElement('button');
    book.className = 'bg-zinc-400 dark:bg-zinc-700 drop-shadow hover:drop-shadow-2xl h-48 rounded-xl transition-[drop-shadow] duration-350';
    bookshelf.appendChild(book);
  }

  (new ResizeObserver(handleScroll)).observe(document.body);
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleScroll);
  document.getElementById('change-theme').addEventListener('click', toogleTheme);

  document.getElementById('add-book').addEventListener('click', handleModal);
  document.getElementById('add-book-modal-close').addEventListener('click', handleModal);
  document.getElementById('add-book-modal-overlay').addEventListener('click', handleModal);

  document.getElementById('add-book-modal-submit').addEventListener('click', handleSubmit);

  document.getElementById('title-input').addEventListener('blur', (e) => 
    document.getElementById('title-error-message').classList[e.target?.value ? 'add' : 'remove' ]('hidden')
  );
  document.getElementById('author-input').addEventListener('blur', (e) => 
    document.getElementById('author-error-message').classList[e.target?.value ? 'add' : 'remove' ]('hidden')
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

  const anyErrors = document.getElementById('add-book-form').querySelectorAll('.hidden').length !== Object.keys(input).length;

  if (!anyErrors) {
    handleModal();
  }

  e?.preventDefault();
}

function handleScroll() {
  document.querySelector('header')
    .classList[window.scrollY ? 'add' : 'remove']('drop-shadow');
  document.querySelector('footer')
    .classList[window.scrollY !== document.body.scrollHeight - window.innerHeight ? 'add' : 'remove']('drop-shadow');
}

function toogleTheme() {
  const button = document.getElementById('change-theme');
  button.classList.toggle('ph-moon-bold');
  button.classList.toggle('ph-sun-bold');
  document.documentElement.classList.toggle('dark');
}

window.addEventListener('DOMContentLoaded', main);
