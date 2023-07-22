import axios from 'axios';

const recipes = document.querySelector('.recipes-js');

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';

async function recipesMarkup() {
  //const markup = await fetch();
  return await fetch(
    `${BASE_URL}/recipes?limit=9`
    // ?category=Beef&page=1&limit=6&time=160&area=Irish&ingredient=640c2dd963a319ea671e3796`
  )
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    })
    .then(obj => console.log(obj))
    .catch(err => console.log(err));
}

recipesMarkup();
