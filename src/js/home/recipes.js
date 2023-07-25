import axios from 'axios';
import SimpleLightbox from 'simplelightbox';

const recipes = document.querySelector('.recipes-js');

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';

async function recipesFetch() {
  // const markup =
  return await fetch(`${BASE_URL}/recipes?limit=9`)
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    })
    .then(obj => {
      //   console.log(obj);
      console.log('obj.results', obj.results);
      recipes.innerHTML = recipesMarkup(obj.results);
      recipes.insertAdjacentHTML('beforeend', recipesMarkup(obj.results));
    })
    .catch(err => console.log(err));
}

recipesFetch();

function recipesMarkup(arr) {
  return arr
    .map(
      ({ title, thumb }) => `<li>
        <img src="${thumb}" alt="${title}" width="150">
        <button type="button">heart</button>
        <h2>${title}</h2>
        <p>description</p>
        <p>rating</p>
        <button type="button">See recipe</button>
    </li>`
    )
    .join('');
}
