import { markUpRating } from './modal-rating';

import { renderStars } from '../js/favorites/render';

// import localStorage from './home/addToFavorites.js';

// import { KEY } from './addToFavorites';
// import { addToFavorites, removeFromFavorites } from './addToFavorites';
// Всі посилання

let refs = {
  closeBtn: document.querySelector('.modal-close-btn'),
  closeVideo: document.querySelector('.tiezer-close-btn'),
  tiezer: document.querySelector('.tiezer'),
  trailerBox: document.querySelector('.trailer-box'),
  btnOpenYouTube: document.querySelector('.js-btn-openYouTube'),
  preview: document.querySelector('.recipes'),
  video: document.querySelector('iframe'),
  title: document.querySelector('.js-title'),
  time: document.querySelector('.js-minute'),
  modalRecipe: document.querySelector('.js-modal-recipe'),
  backdropRecipe: document.querySelector('.js-backdrop-recipe'),
  ratingBox: document.querySelector('.js-rating-recipe-wraper'),
  IngredientBox: document.querySelector('.recipes-list'),
  hashtagsBox: document.querySelector('.hashtags-list'),
  textContentBox: document.querySelector('.cooking-recipes'),
  addToFavoriteBtn: document.querySelector('.js-addToFavorite-btn'),
  removeFromFavoriteBtn: document.querySelector('.js-removeFromFavorite-btn'),
};

// Запуск по кліку
setTimeout(() => {
  finallInitPage('6462a8f74c3d0ddd28897fc1');
}, 2000);

// /** Відкриття та закриття модального вікна */

refs.closeBtn.addEventListener('click', closeModalClose);
refs.backdropRecipe.addEventListener('click', clickBackdropClick);
function openModalOpen() {
  // Loader.Start();
  setTimeout(() => {
    window.addEventListener('keydown', onEscPress);
    document.body.classList.add('overflowHidden');
    refs.backdropRecipe.classList.add('active');
    refs.modalRecipe.classList.add('active');
    // Loader.Stop();
  }, 50);
}
function closeModalClose() {
  window.removeEventListener('keydown', onEscPress);
  document.body.classList.remove('overflowHidden');
  refs.backdropRecipe.classList.remove('active');
  refs.modalRecipe.classList.remove('active');
}
function clickBackdropClick(e) {
  if (e.currentTarget === e.target) {
    stopVideos();
    closeModalClose();
  }
}
function onEscPress(e) {
  if (e.code === 'Escape') {
    closeModalClose();
  }
}
// /** Кінець Відкриття та закриття модального вікна */

export function finallInitPage(id) {
  fetchRecipeById(id).then(data => {
    // isFavorite(data._id);
    renderVIDEO(data);
    renderRanting(data);
    // markUpRating();
    renderIngridient(data);
    renderHashtags(data);
    renderText(data);
    openModalOpen();
    recipeId = data._id;
  });
}

async function fetchRecipeById(id) {
  const resp = await fetch(
    `https://tasty-treats-backend.p.goit.global/api/recipes/${id}`
  );
  const data = await resp.json();
  return data;
}

// YouTUBE module
refs.closeVideo.addEventListener('click', stopVideos);
refs.btnOpenYouTube.addEventListener('click', openPlayer);

function stopVideos() {
  refs.trailerBox.classList.remove('active');

  document.querySelectorAll('iframe').forEach(video => {
    video.src = video.src;
  });
  document.querySelectorAll('video').forEach(video => {
    video.pause();
  });
}
function openPlayer() {
  refs.trailerBox.classList.add('active');
}
// end YouTUBE module

//  Рендер частин сторінки
function getKeyYouTybe(url) {
  let indexLast = url.split('').length;

  let key = url.split('').splice(32, indexLast).join('');
  return key;
}

// "youtube":"https://www.youtube.com/watch?v=e52IL8zYmaE"
function renderVIDEO(data) {
  const markUp = `
   <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/${getKeyYouTybe(
                  data.youtube
                )}?origin=AntonTy35.github.io"

title = "YouTube video player"
frameborder = "0"
allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
allowfullscreen
  ></iframe >
`;
  refs.tiezer.innerHTML = markUp;
}
function renderRanting(data) {
  let markupR = `
  <div class="cards__rating rating">
          <div class="rating__value detail">${data.rating}</div>
          <div class="rating__body">
            <div class="rating__active"></div>
            <div class="rating__items">
              <input
                type="radio"
                class="rating__item"
                name="rating"
                value="1"
              />
              <input
                type="radio"
                class="rating__item"
                name="rating"
                value="2"
              />
              <input
                type="radio"
                class="rating__item"
                name="rating"
                value="3"
              />
              <input
                type="radio"
                class="rating__item"
                name="rating"
                value="4"
              />
              <input
                type="radio"
                class="rating__item"
                name="rating"
                value="5"
              />
            </div>
          </div>
        </div>`;
  refs.ratingBox.innerHTML = markupR;
}
function renderIngridient(data) {
  const markup = data.ingredients
    .map(({ measure, name }) => {
      return `<li class="recipes-subtitle">
                ${name}
                <p class="recipes-inf" p>${measure}</p>
              </li>`;
    })
    .join('');

  refs.IngredientBox.innerHTML = markup;
}
function renderHashtags(data) {
  if (data.tags.length === 0) {
    return;
  }
  const markup = data.tags
    .map(tag => {
      return ` <li class="hashtags">#${tag}</li>`;
    })
    .join('');

  refs.hashtagsBox.innerHTML = markup;
}
function renderText(data) {
  refs.preview.src = data.preview;
  refs.title.textContent = data.title;
  refs.textContentBox.textContent = data.instructions;
  refs.time.textContent = data.time + ' min';
}

export function AddToFav({ target }) {
  const storage = localStorage.getItem('favorites');
  const data = JSON.parse(storage);
  const currentRec = JSON.parse(refs.modalRecipes.dataset.info);
  if (storage) {
    if (data.find(el => el.id === currentRec.id)) {
      localStorage.setItem(
        'favorites',
        JSON.stringify([...data.filter(el => el.id !== currentRec.id)])
      );
      target.textContent = 'Add to favorite';
    } else {
      localStorage.setItem('favorites', JSON.stringify([...data, currentRec]));
      target.textContent = 'Remove favorite';
    }
  } else {
    localStorage.setItem('favorites', JSON.stringify([currentRec]));
    target.textContent = 'Remove favorite';
  }

  // const seeRecipeButtons = document.querySelectorAll('.item-rec');
  // seeRecipeButtons.forEach(seeRecipeButton => {
  //   seeRecipeButton.addEventListener('click', () => {
  //     const recipeId = seeRecipeButton.dataset.id;
  //     OpenModal(seeRecipeButton);
  //   });
  // });
}
// export function OpenModal(currentBtn) {
//   refs.closeBtn.addEventListener('click', closeModalClose);
//   refs.backdropRecipe.addEventListener('click', clickBackdropClick);
//   // refs.giveRatingBtn.addEventListener('click', OpenRateModal);
//   window.addEventListener('keydown', onEscPress);

//   refs.backdropRecipe.classList.remove('is-hidden-modal');
//   refs.modalRecipe.classList.remove('is-hidden-modal');
//   // refs.rateForm.dataset.id = currentBtn.dataset.id;
//   finallInitPage(currentBtn.dataset.id);

//   const storage = localStorage.getItem('favorites');
//   const data = JSON.parse(storage);

//   if (storage) {
//     if (data.find(el => el.id === currentBtn.dataset.id)) {
//       refs.saveRecipeBtn.textContent = 'Remove favorite';
//     } else {
//       refs.saveRecipeBtn.textContent = 'Add to favorite';
//     }
//   }

//   refs.addToFavoriteBtn.addEventListener('click', AddToFav);
// }

// Реалізцація кнопок додавання та видалення з блоку favorites
// refs.addToFavoriteBtn.addEventListener('click', onAddToFavClick);
// refs.removeFromFavoriteBtn.addEventListener('click', onRemoveFromFavClick);

// function onAddToFavClick(e) {
//   const listItem = document.querySelector(`li[data-id='${recipeId}']`);

//   addToFavorites(localctorage.load(KEY), recipeId);

//   listItem.classList.add('onFavorites');
//   refs.addToFavoriteBtn.classList.add('hidden');
//   refs.removeFromFavoriteBtn.classList.remove('hidden');
// }

// function onRemoveFromFavClick(e) {
//   const listItem = document.querySelector(
//     `li.cards__item[data-id='${recipeId}']`
//   );

//   removeFromFavorites(localctorage.load(KEY), recipeId);

//   listItem.classList.remove('onFavorites');
//   refs.addToFavoriteBtn.classList.remove('hidden');
//   refs.removeFromFavoriteBtn.classList.add('hidden');
// }

// function isFavorite(id) {
//   const favCards = localctorage.load(KEY) || {};
//   if (Object.keys(favCards).includes(id)) {
//     refs.removeFromFavoriteBtn.classList.remove('hidden');
//     refs.addToFavoriteBtn.classList.add('hidden');
//     return;
//   }
//   refs.removeFromFavoriteBtn.classList.add('hidden');
//   refs.addToFavoriteBtn.classList.remove('hidden');
// }
