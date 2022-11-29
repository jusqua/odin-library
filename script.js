const bookShelf = document.getElementById('book-shelf');
const addBookButton = document.getElementById('add-book');
const header = document.querySelector('header');
const footer = document.querySelector('footer');

function handleScroll() {
  if (window.scrollY !== 0 && !header.classList.contains('elevation')) {
    header.classList.add('elevation');
  } else if (window.scrollY === 0) {
    header.classList.remove('elevation');
  }
  if (window.scrollY !== document.body.scrollHeight - window.innerHeight && !footer.classList.contains('elevation')) {
    footer.classList.add('elevation');
  } else if (window.scrollY === document.body.scrollHeight - window.innerHeight) {
    footer.classList.remove('elevation');
  }
}

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.classList.add('dark');
}

window.addEventListener('scroll', handleScroll);

addBookButton.addEventListener('click', () => {
  bookShelf.innerHTML += '<div class="book elevation"></div>';
  handleScroll();
});

