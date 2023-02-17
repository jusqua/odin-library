function toogleTheme() {
  const button = document.getElementById('change-theme');
  if (document.documentElement.classList.contains('dark'))
    button.classList.replace('ph-sun-bold', 'ph-moon-bold');
  else
    button.classList.replace('ph-moon-bold', 'ph-sun-bold');
  document.documentElement.classList.toggle('dark');
}

window.addEventListener('DOMContentLoaded', () => {
  const bookshelf = document.getElementById('bookshelf');


  for (let i = 0; i < 9; i++) {
    const book = document.createElement('button');
    book.className = 'bg-zinc-400 dark:bg-zinc-700 drop-shadow hover:drop-shadow-2xl h-48 rounded-xl transition-[drop-shadow] duration-350';
    bookshelf.appendChild(book);
  }

  document.getElementById('change-theme').addEventListener('click', toogleTheme);

  if (window.matchMedia('(prefers-color-scheme: dark)').matches)
    toogleTheme();
});
