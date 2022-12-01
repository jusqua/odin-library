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
    bookShelf.innerHTML += '<div class="book elevation"></div>';
  });
});

window.addEventListener('load', () => document.body.classList.remove('preload'));
