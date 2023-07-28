import { CLASS_PAGINATION } from '@splidejs/splide';
import axios from 'axios';

// Comment out start
// export async function getData() {
//   const response = await axios.get(`${BASE_URL}/recipes/popular`);
//   return response.data;
// }

// export async function getFavoritesRecipes() {
//   const favoriteRecipes = await getData();
//   pushDataToLocalStorage('favorites', favoriteRecipes);
// }
// Comment out end

function pushDataToLocalStorage(key, data) {
  const newData = [...data, ...data, ...data, ...data, ...data];
  console.log('newData', newData);
  localStorage.setItem(key, JSON.stringify(newData));
}

export function pullDataFromLocalStroage(key) {
  const data = JSON.parse(localStorage.getItem(key));
  console.log(data);
  return data;
}

export function isDataValid(data) {
  if (!data || data.constructor.name != 'Array') {
    return false;
  } else {
    return true;
  }
}
