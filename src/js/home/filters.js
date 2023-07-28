import axios from 'axios';
import { recipesFetch } from '../home/recipes';

const BASE_URL_FOR_FILTER = 'https://tasty-treats-backend.p.goit.global/api';

const searchInEl = document.querySelector('.search-input');
const resetBtnInput = document.querySelector('.reset-btn');

const placeholderTime = document.querySelector('.time-placeholder');
const placeholderArea = document.querySelector('.area-placeholder');
const placeholderIng = document.querySelector('.ingredient-placeholder');

let valueTime;
let valueArea;
let valueIngr;

//

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

//

async function fetchAreas() {
  try {
    const response = await axios.get(`${BASE_URL_FOR_FILTER}/areas`);
    return response.data.map(area => area.name);
  } catch (error) {
    return null;
  }
}

async function fetchIngredients() {
  try {
    const response = await axios.get(`${BASE_URL_FOR_FILTER}/ingredients`);
    return response.data;
  } catch (error) {
    return null;
  }
}

async function createTimeList() {
  const inputEl = document.querySelector('.time-input');
  const iconEl = document.querySelector('.time-icon');
  const containerEl = document.querySelector('.time-list');

  for (let i = 5; i <= 120; i += 5) {
    const buttonEl = `<li>
                      <button  class="time-item" type="button">${i} min</button>
                    </li>`;
    containerEl.insertAdjacentHTML('beforeend', buttonEl);
  }

  inputEl.addEventListener('click', () => {
    containerEl.classList.toggle('active');
    iconEl.classList.toggle('active');
  });

  const itemEls = document.querySelectorAll('.time-item');
  itemEls.forEach(function (item) {
    item.addEventListener('click', function () {
      placeholderTime.textContent = item.textContent;
      placeholderTime.classList.add('active');
      if (placeholderTime.textContent !== '') {
        valueTime = parseInt(item.textContent.match(/\d+/)[0], 10);
        console.log(valueTime);
        function changeingredient(valueTime) {
          getFilter.time = valueTime;
          console.log(getFilter);
        }
        changeingredient(valueTime);
        someFunc(getFilter);
      }
    });
  });
}

//  Створення Area List

async function createAreasList() {
  const inputEl = document.querySelector('.area-input');
  const iconEl = document.querySelector('.area-icon');
  const containerEl = document.querySelector('.area-list');
  const areas = await fetchAreas();
  areas.sort();
  const buttonEl = areas
    .map(
      area => `<li>
                 <button class="area-item" type="button">${area}</button>
               </li>`
    )
    .join('');
  containerEl.insertAdjacentHTML('beforeend', buttonEl);

  inputEl.addEventListener('click', () => {
    containerEl.classList.toggle('active');
    iconEl.classList.toggle('active');
  });

  const itemEls = document.querySelectorAll('.area-item');
  itemEls.forEach(function (item) {
    item.addEventListener('click', function () {
      placeholderArea.textContent = item.textContent;
      placeholderArea.classList.add('active');
      if (placeholderArea.textContent !== '') {
        valueArea = item.textContent;
        console.log(valueArea);
        function changeingredient(valueArea) {
          getFilter.area = valueArea;
          console.log(getFilter);
        }
        changeingredient(valueArea);
        someFunc(getFilter);
      }
    });
  });
}

//  Створення Ingredient List

async function createIngredientsList() {
  const iconEl = document.querySelector('.ingredient-icon');
  const inputEl = document.querySelector('.ingredient-input');
  const containerEl = document.querySelector('.ingredient-list');
  const response = await fetchIngredients();
  const ingredients = response
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));
  const buttonEls = ingredients
    .map(({ _id, name }) => {
      return `<li>
              <button class="ingredient-item" id="${_id}" type="button">${name}</button>
            </li>`;
    })
    .join('');
  containerEl.insertAdjacentHTML('beforeend', buttonEls);

  inputEl.addEventListener('click', () => {
    containerEl.classList.toggle('active');
    iconEl.classList.toggle('active');
  });

  const itemEls = document.querySelectorAll('.ingredient-item');
  itemEls.forEach(function (item) {
    item.addEventListener('click', function () {
      placeholderIng.textContent = item.textContent;
      placeholderIng.classList.add('active');
      if (placeholderIng.textContent !== '') {
        valueIngr = item.id;
        console.log(valueIngr);
        function changeingredient(valueIngr) {
          getFilter.ingredient = valueIngr;
          console.log(getFilter);
        }
        changeingredient(valueIngr);
        someFunc(getFilter);
      }
    });
  });
}

createIngredientsList();
createAreasList();
createTimeList();

// Фільрація по інпуту

searchInEl.addEventListener(
  'input',
  debounce(() => {
    const title = String(searchInEl.value.trim());
    if (title !== '') {
      const searchIcon = document.querySelector('.search-icon');
      searchIcon.style.fill = '#9bb537';
      searchInEl.classList.add('active');
      resetBtnInput.style.display = 'block';
      getFilter.title = title;
      someFunc(getFilter);
    } else {
      searchInEl.classList.remove('active');
      resetBtnInput.style.display = 'none';
    }
  }),
  500
);

resetBtnInput.addEventListener('click', () => {
  resetBtnInput.style.display = 'none';
  searchInEl.value = '';
  getFilter.title = '';
  someFunc(getFilter);
});

// Скидання фільтрації при кліку на кнопку Reset the filter

const resetBtnFlterBar = document.querySelector('.filter-bar-btn-reset');

resetBtnFlterBar.addEventListener('click', () => {
  searchInEl.value = '';
  // placeholderTime.textContent = '';
  // placeholderArea.textContent = '';
  // placeholderIng.textContent = '';
  getFilter.area = '';
  getFilter.time = '';
  getFilter.ingredient = '';
  getFilter.title = '';
  someFunc(getFilter);
});

// Створення значень для фільтраційного посилання

const getFilter = {
  title: '',
  area: '',
  time: '',
  ingredient: '',
};
const someFunc = queryParams => {
  const query = Object.entries(queryParams)

    .map(([key, value]) => value && `${key}=${value}`)
    .join('&');
  console.log(query);

  return recipesFetch(query);
};

console.log(searchInEl);
