const buttonBurger = document.querySelector('.button-burger');
const mobileMenu = document.getElementById('mobileMenu');
const buttonClose = document.querySelector('.button-close');

buttonBurger.addEventListener('click', () => {
  mobileMenu.classList.add('show-mob');
});

buttonClose.addEventListener('click', () => {
  mobileMenu.classList.remove('show-mob');
});

// ACTIVE-PAGE-COLOR////
const currentPageUrl = window.location.href;
const navListItems = document.querySelectorAll('.nav-list');

navListItems.forEach(navListItem => {
  const link = navListItem.querySelector('a');
  const linkUrl = link.href;
  if (currentPageUrl === linkUrl) {
    navListItem.classList.add('active');
  } else {
    navListItem.classList.remove('active');
  }
});

// BTN-SHOPPING///
// const buttonTrash = document.querySelector('.button-trash');
// const orderNowModal = document.querySelector('.backdrop-order-now');

// buttonTrash.addEventListener('click', () => {
//   orderNowModal.classList.remove('is-hidden');
// });

// THEME-DARK////
// const switcherCheckbox = document.getElementById('switcherCheckbox');
// const mobileMenuDark = document.getElementById('mobileMenu');

// switcherCheckbox.addEventListener('click', () => {
//   mobileMenuDark.classList.toggle('dark-theme');
// });
