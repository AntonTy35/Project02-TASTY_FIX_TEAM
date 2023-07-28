// import axios from 'axios';

import { finallInitPage } from '../modal-banana-pancakes';

const recipes = document.querySelector('.recipes-js');

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';

export async function recipesFetch(query) {
  return await fetch(`${BASE_URL}/recipes?limit=9${query ? query : ''}`)
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
                  
                  <div class="rating_section_herz">        
                      <div class="rating__group_herz">
                          <input class="rating__herz" type="radio"               name="general" value="1">
                      </div>
                  </div>

               </div>    
                <div class="text_from_above_title">
                    <h2 class="recipes_title">${title}</h2>
                    <p class="recipes_description">${description}</p>
                    <p class="recipes_rating">rating</p>
                </div>
                <div class="recipes_btn">

                   <div class="rating_section_star">
                       <div class="rating__group_star">
                           <input class="rating__star" type="radio"                name="mood" value="1" >
                           <input class="rating__star" type="radio"                name="mood" value="2" checked>
                           <input class="rating__star" type="radio"                name="mood" value="3"  >
                           <input class="rating__star" type="radio"                name="mood" value="4" >
                           <input class="rating__star" type="radio"                name="mood" value="5" >
                       </div>
                   </div>

                   
                   <button class="recipes_btn_see_recipe" type="button">See recipe</button> 
                <div>             
              
          <div>
       <div>
              </li>`
    )
    .join('');
}
recipes.addEventListener('click', event => {
  const targetBtn = event.target;
  if (targetBtn.classList.contains('see-recipe-btn')) {
    finallInitPage(targetBtn);
  }
});
