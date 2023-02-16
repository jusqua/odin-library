window.addEventListener('DOMContentLoaded', () => {
  const dark = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList[dark ? 'add' : 'remove']('dark');
});
