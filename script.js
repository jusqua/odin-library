function main() {
  const bookshelf = document.getElementById('bookshelf');

  for (let i = 0; i < 9; i++) {
    const book = document.createElement('button');
    book.className = 'bg-zinc-400 dark:bg-zinc-700 drop-shadow hover:drop-shadow-2xl h-48 rounded-xl transition-[drop-shadow] duration-350';
    bookshelf.appendChild(book);
  }

  document.getElementById('change-theme').addEventListener('click', toogleTheme);
  if (window.matchMedia('(prefers-color-scheme: dark)').matches)
    toogleTheme();
}

function toogleTheme() {
  const button = document.getElementById('change-theme');
  button.classList.toggle('ph-moon-bold');
  button.classList.toggle('ph-sun-bold');
  document.documentElement.classList.toggle('dark');
}

window.addEventListener('DOMContentLoaded', main);
