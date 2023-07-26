import { previousPage, nextPage, showPrevButton, showNextButton } from './nav';
import renderFavorites from './render';
import { getFavoritesRecipes } from './data';

mobile = true;
BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';
currentPage = 1;
pageSize = mobile ? 1 : 12;

// Comment out this
getFavoritesRecipes();

renderFavorites();

document
  .querySelector('#prevButton')
  .addEventListener('click', previousPage, false);
document
  .querySelector('#nextButton')
  .addEventListener('click', nextPage, false);
