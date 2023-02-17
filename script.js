window.addEventListener('DOMContentLoaded', () => {
  const dark = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList[dark ? 'add' : 'remove']('dark');

  const bookshelf = document.getElementById('bookshelf');

  for (let i = 0; i < 9; i++) {
    const book = document.createElement('button');
    book.className = 'bg-zinc-400 dark:bg-zinc-700 drop-shadow hover:drop-shadow-2xl h-48 rounded-xl transition-[drop-shadow] duration-350';
    bookshelf.appendChild(book);
  }
});
