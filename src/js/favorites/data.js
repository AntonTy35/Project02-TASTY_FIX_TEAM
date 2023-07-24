import axios from 'axios';

export async function getData() {
  const response = await axios.get(`${BASE_URL}/recipes/popular`);
  console.log(response.data);
  return response.data;
}

export async function getFavoritesRecipes() {
  favoriteRecipes = await getData();
  pushDataToLocalStorage('favorites', favoriteRecipes);
}

function pushDataToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function pullDataFromLocalStroage(key) {
  let data = JSON.parse(localStorage.getItem(key));
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
