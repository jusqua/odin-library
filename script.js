function main() {
  const bookshelf = document.getElementById('bookshelf');

  for (let i = 0; i < 9; i++) {
    const book = document.createElement('button');
    book.className = 'bg-zinc-400 dark:bg-zinc-700 drop-shadow hover:drop-shadow-2xl h-48 rounded-xl transition-[drop-shadow] duration-350';
    bookshelf.appendChild(book);
  }

  (new ResizeObserver(handleScroll)).observe(document.body);
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleScroll);
  document.getElementById('change-theme').addEventListener('click', toogleTheme);
  if (window.matchMedia('(prefers-color-scheme: dark)').matches)
    toogleTheme();
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
