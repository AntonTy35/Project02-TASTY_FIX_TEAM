import { isDataValid, pullDataFromLocalStroage } from './data';
import { showNextButton, showPrevButton } from './nav';

function renderStars(rating) {
  let stars = [];
  rating = Math.round(rating / 100);

  console.log(rating);

  for (let i = rating; i >= 1; i--)
    stars.push(
      '<i class="fa fa-star" aria-hidden="true" style="color: gold;"></i>&nbsp;'
    );

  stars = stars.join(' ');

  return stars;
}

function favoritesPerPage(favorites) {
  renderFavoritesPerPage = '';

  let favoritesPerPage = favorites.filter((recipe, index) => {
    let start = (currentPage - 1) * pageSize;
    let end = currentPage * pageSize;
    if (index >= start && index < end) return true;
  });

  favoritesPerPage.forEach(recipe => {
    renderFavoritesPerPage += `<li class="favor-item">
    <img
      src=${recipe.preview}
      class="img-favor"
      alt="preview"
      width="335"
      height="335"
    />
    <div class="card-favor">
      <h2 class="title-favor">${recipe.title}</h2>
      <p class="desc-favor">${recipe.description}</p>
      <div class="rating-btn-favor">
        <p class="rating-favor">Rating: ${renderStars(recipe.popularity)}</p>
        <btn class="btn-favor">See recipe</btn>
      </div>
    </div>
  </li>`;
  });

  return renderFavoritesPerPage;
}

export default async function renderFavorites(page = 1) {
  showPrevButton(page);
  showNextButton(page);

  const favorites = pullDataFromLocalStroage('favorites');

  if (!isDataValid(favorites)) {
    document.getElementById('favorList').innerHTML =
      '<li>LocalStorage is empty</li>';
  } else {
    renderedFavoritesPerPage = favoritesPerPage(favorites);
    document.getElementById('favorList').innerHTML = renderedFavoritesPerPage;
  }
}
