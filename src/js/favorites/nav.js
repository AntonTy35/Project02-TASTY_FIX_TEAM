import { isDataValid, pullDataFromLocalStroage } from './data';
import renderFavorites from './render';

favorites = pullDataFromLocalStroage('favorites');

export function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    renderFavorites(currentPage);
  }
}

export function nextPage() {
  if (currentPage * pageSize < favorites.length) {
    currentPage++;
    renderFavorites(currentPage);
  }
}

export function numberOfPages() {
  if (!isDataValid(favorites)) {
    return 0;
  }

  try {
    return Math.ceil(favorites.length / pageSize);
  } catch (e) {
    console.log(e);
    return 0;
  }
}

export function showPrevButton(page) {
  if (page === 1) {
    prevButton.style.visibility = 'hidden';
  } else {
    prevButton.style.visibility = 'visible';
  }
}

export function showNextButton(page) {
  if (numberOfPages() === 0 || page === numberOfPages()) {
    nextButton.style.visibility = 'hidden';
  } else {
    nextButton.style.visibility = 'visible';
  }
}
