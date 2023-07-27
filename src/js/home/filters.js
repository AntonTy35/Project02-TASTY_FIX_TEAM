import SlimSelect from 'slim-select';
import axios from 'axios';
const axios = require('axios').default;
import { recipesFetch } from './recipes';

const urlAreas = 'https://tasty-treats-backend.p.goit.global/api/areas';
const urlIngrs = 'https://tasty-treats-backend.p.goit.global/api/ingredients';

// Ініціалізація Slim Select
let valueTime;
let valueArea;
let valueIngr;

let setSelectTime = new SlimSelect({
  select: '#selectTime',
  settings: {
    showSearch: false,
    searchHighlight: true,
    placeholder: true,
    placeholderText: '',
  },
  events: {
    afterChange: newValue => {
      if (newValue[0]?.value !== '0') {
        valueTime = newValue;
        someFunc({
          area: valueArea[0]?.text,
          time: valueTime[0]?.value,
          ingredient: valueIngr[0].value,
        });
      }
      console.log(valueArea);
    },
  },
});

let setSelectArea = new SlimSelect({
  select: '#selectArea',
  settings: {
    showSearch: false,
    searchHighlight: true,
    placeholder: true,
    placeholderText: '',
  },
  events: {
    afterChange: newValue => {
      if (newValue[0]?.value !== 'Area') {
        valueArea = newValue;
        someFunc({
          area: valueArea[0]?.text,
          time: valueTime[0]?.value,
          ingredient: valueIngr[0].value,
        });
      }
      console.log(valueArea);
    },
  },
});
let setSelectIngrs = new SlimSelect({
  select: '#selectIngrs',
  settings: {
    showSearch: true,
    searchHighlight: true,
  },
  events: {
    afterChange: newValue => {
      if (newValue[0]?.value !== '0') {
        valueIngr = newValue;
        someFunc({
          area: valueArea[0]?.text,
          time: valueTime[0]?.value,
          ingredient: valueIngr[0].value,
        });
      }
    },
  },
});

// Отримання значень для селектів Time

const optionsArrayTime = [];
for (let i = 5; i <= 120; i += 5) {
  const optionObject = {
    value: i,
    text: `${i} min`,
  };
  optionsArrayTime.push(optionObject);
  optionsArrayTime.unshift({ placeholder: true, text: '', value: '0' });
  setSelectTime.setData(optionsArrayTime);
}

// Отримання значень для селектів Area

const getAreas = () => axios.get(urlAreas);

getAreas()
  .then(res => {
    const data = res?.data?.map(element => ({
      text: element.name,
      value: element._id,
    }));
    data.unshift({ placeholder: true, text: '', value: 'Area' });
    setSelectArea.setData(data);
  })
  .catch(error => console.log(error));

// Отримання значень для селектів ingrs

const getIngrs = () => axios.get(urlIngrs);

getIngrs()
  .then(res => {
    const data = res?.data?.map(element => ({
      text: element.name,
      value: element._id,
    }));
    data.unshift({ placeholder: true, text: '', value: '0' });
    setSelectIngrs.setData(data);
  })
  .catch(error => console.log(error));

// Обнулення значень при кліку на кнопку Reset

const resetButton = document.querySelector('.filter-bar-btn-reset');

resetButton.addEventListener('click', () => {
  // Обнулити значення вводу інпуту
  const filterSearchInput = document.querySelector('.filter-bar-search-input');
  filterSearchInput.value = '';

  // Обнулити вибрані значення у селектах
  setSelectArea.setSelected('');
  setSelectIngrs.setSelected('');
  setSelectTime.setSelected('');
});

// Фільтрація рецептів
const someFunc = queryParams => {
  const query = Object.entries(queryParams)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  console.log(query);

  return recipesFetch(query);
};
