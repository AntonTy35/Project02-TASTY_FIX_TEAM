const scrollUpButton = document.querySelector('.scroll-up-btn');

function toggleScrollUpButton() {
  if (document.documentElement.scrollTop > 100) {
    scrollUpButton.style.display = 'block';
  } else {
    scrollUpButton.style.display = 'none';
  }
}

function scrollToTop() {
  document.documentElement.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

scrollUpButton.addEventListener('click', scrollToTop);
window.addEventListener('scroll', toggleScrollUpButton);
