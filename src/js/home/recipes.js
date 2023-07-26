import axios from 'axios';

const recipes = document.querySelector('.recipes-js');

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';

async function recipesFetch() {
  return await fetch(`${BASE_URL}/recipes?limit=9`)
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    })
    .then(obj => {
      console.log('obj.results', obj.results);
      recipes.insertAdjacentHTML('beforeend', recipesMarkup(obj.results));
    })
    .catch(err => console.log(err));
}

recipesFetch();

function recipesMarkup(arr) {
  return arr
    .map(
      ({ title, thumb, description }) => `<li>
      <div id="text_from_above">
        <img class="recipes_img" src="${thumb}" alt="${title}" width="240" height="264">
          <div class="text_from_above">
               <div class="recipes_button_heart_from_above">
                <button class="recipes_button_heart" type="button">
                  <svg class="recipes_icon_heart" width="24" height="24">
                  <use href="/src/images/off.svg">
                  </use>
                </svg>
              </button>
               </div>    
                <div class="text_from_above_title">
              <h2 class="recipes_title">${title}</h2>
              <p class="recipes_description">${description}</p>
              <p class="recipes_rating">rating</p>
                </div>
               <div class="recipes_btn">
                 <div class="recipes_simple_reting">
                   
                 <div>
              <button class="recipes_btn_see_recipe" type="button">See recipe</button> 
                <div>             
              
              <div>
              <div>
              </li>`
    )
    .join('');
}
