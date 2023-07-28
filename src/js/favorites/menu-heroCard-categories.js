import renderItem from '../renders/renders';
import '/node_modules/tui-pagination/dist/tui-pagination.min.css';
import startPagination from './pagination';
import { OpenModal } from './modal-recipes';
import Notiflix from 'notiflix';

const refs = {
  favoriteCategoriesList: document.querySelector('.favorite-categories'),
  favoriteRecipesList: document.querySelector('.favorite-list'),
  warning: document.querySelector('.empty-storage'),
  paginationBox: document.getElementById('pagination'),
  allBtn: document.querySelector('.all-btn'),
};

let currentBtn = '';

const calcPages = () => {
  const screenWidth = window.innerWidth;
  return screenWidth < 768 ? 9 : 12;
};

const groupObjects = (array, groupSize) => {
  const result = {};
  for (let i = 0; i < array.length; i += groupSize) {
    const groupName = Math.floor(i / groupSize) + 1;
    result[groupName] = array.slice(i, i + groupSize);
  }
  return result;
};

const onFavoritesRealod = () => {
  const categoryMarkup = generateCategoryList();

  const allCatBtn = `<button class="button-fav all-btn onActive" name="all">All categories</button>`;

  const data = JSON.parse(localStorage.getItem('favorites')) || [];

  refs.favoriteRecipesList.innerHTML = '';
  refs.favoriteCategoriesList.innerHTML = '';

  const emptyStorage = document.querySelector('.empty-storage');

  if (data.length) {
    refs.favoriteCategoriesList.innerHTML = `${allCatBtn}${categoryMarkup}`;
    emptyStorage.classList.toggle('is-hidden');
  } else {
    refs.allBtn.style.display = 'none';
    emptyStorage.classList.toggle('is-hidden');
  }

  generateStorageList();
};

const generateStorageList = (pageSet = 1) => {
  const storage = localStorage.getItem('favorites');
  const data = JSON.parse(storage) || [];

  refs.allBtn.style.display = 'none';

  if (data.length) {
    refs.allBtn.style.display = 'block';

    const perPage = calcPages();
    const objData = groupObjects(data, perPage);
    const totalPages = Object.keys(objData).length;

    if (totalPages > 1) {
      refs.paginationBox.style.display = 'block';
      startPagination(pageSet, perPage, totalPages, generateStorageList);
    } else {
      refs.paginationBox.style.display = 'none';
    }

    const listMarkup = objData[pageSet].reduce(
      (markup, { title, description, preview, rating, id, category }) =>
        markup + renderItem(title, description, preview, rating, id, category),
      ''
    );

    refs.favoriteRecipesList.innerHTML = listMarkup;
    refs.warning.classList.add('is-hidden');
  } else {
    refs.warning.classList.remove('is-hidden');
    refs.allBtn.classList.add('is-hidden');

    if (window.innerWidth < 768) {
      refs.hiroImg.classList.add('is-hidden');
    }
  }
};

const generateCategoryList = () => {
  const storage = localStorage.getItem('favorites');
  const data = JSON.parse(storage) || [];
  if (data.length) {
    return data
      .flatMap(recipe => recipe.category)
      .filter((category, index, array) => array.indexOf(category) === index)
      .reduce(
        (categoryMarkup, category) => categoryMarkup + renderCategory(category),
        ''
      );
  }
  return '';
};

const renderCategory = category =>
  `<button class="button-fav">${category}</button>`;

const filterByCategory = evt => {
  if (evt.target.classList.contains('onActive')) return;

  let data = [];
  let categoryRecipes;
  refs.favoriteRecipesList.innerHTML = '';

  if (evt.target.name === 'details') {
    const recipeId = evt.target.dataset.id;
    OpenModal(recipeId);
  }

  if (evt !== Number(evt) && evt.target.nodeName === 'BUTTON') {
    setActiveClass(evt);
    if (evt.target.name === 'all') return generateStorageList();
    else currentBtn = evt.target.textContent;
  }

  const storage = localStorage.getItem('favorites');
  data = JSON.parse(storage) || [];

  if (!data.length) {
    refs.favoriteCategoriesList.style.display = 'none';
    return;
  }

  categoryRecipes = [...data.filter(recipe => recipe.category === currentBtn)];

  let pageSet = 1;

  if (Number(evt) === evt) pageSet = evt;

  const perPage = calcPages();
  const objData = groupObjects(categoryRecipes, perPage);
  const totalPages = Object.keys(objData).length;

  if (totalPages > 1) {
    refs.paginationBox.style.display = 'block';
    startPagination(pageSet, perPage, totalPages, filterByCategory);
  } else {
    refs.paginationBox.style.display = 'none';
  }

  const listMarkup = objData[pageSet].reduce(
    (markup, { title, description, preview, rating, id, category }) =>
      markup + renderItem(title, description, preview, rating, id, category),
    ''
  );

  refs.favoriteRecipesList.innerHTML = listMarkup;
};

const setActiveClass = evt => {
  const activeBtn = document.querySelector('.onActive');
  if (activeBtn) activeBtn.classList.remove('onActive');
  evt.target.classList.add('onActive');
};

document.addEventListener('DOMContentLoaded', onFavoritesRealod);

refs.favoriteCategoriesList.addEventListener('click', filterByCategory);
