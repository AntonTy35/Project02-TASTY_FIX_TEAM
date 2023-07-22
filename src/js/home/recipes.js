import axios from 'axios';

const recipes = document.querySelector('.recipes-js');

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';

async function recipesFetch() {
  const markup = await fetch(`${BASE_URL}/recipes?limit=9`)
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    })
    .then(obj => {
      //   console.log(obj);
      console.dir(obj.results);
      recipes.innerHTML = recipesMarkup(obj.results);
    })
    .catch(err => console.log(err));

  //   return recipes.insertAdjacentHTML('beforeend', markup);
}

// recipesFetch();

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
